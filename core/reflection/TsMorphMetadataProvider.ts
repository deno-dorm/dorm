import { Project, type PropertyDeclaration, type SourceFile } from 'ts-morph';
import {
  MetadataError,
  MetadataStorage,
  ReferenceKind,
  Utils,
  type EntityMetadata,
  type EntityProperty,
} from '../mod.ts';
import {MetadataProvider} from '../metadata/MetadataProvider.ts'

export class TsMorphMetadataProvider extends MetadataProvider {

  private project!: Project;
  private sources!: SourceFile[];

  override useCache(): boolean {
    return this.config.get('metadataCache')?.enabled ?? true;
  }

  loadEntityMetadata(meta: EntityMetadata, name: string): void {
    if (!meta.path) {
      return;
    }

    this.initProperties(meta);
  }

  getExistingSourceFile(path: string, validate = true): SourceFile {
    return this.getSourceFile(path, validate)!;
  }

  protected initProperties(meta: EntityMetadata): void {
    // load types and column names
    for (const prop of Object.values(meta.properties)) {
      const type = this.extractType(prop);

      if (!type || this.config.get('discovery').alwaysAnalyseProperties) {
        this.initPropertyType(meta, prop);
      }

      prop.type = type || prop.type;
    }
  }

  private extractType(prop: EntityProperty): string {
    if (Utils.isString(prop.entity)) {
      return prop.entity;
    }

    if (prop.entity) {
      return Utils.className(prop.entity());
    }

    return prop.type;
  }

  private cleanUpTypeTags(type: string): string {
    const genericTags = [/Opt<(.*?)>/, /Hidden<(.*?)>/];
    const intersectionTags = [
      '{ [__optional]?: 1 | undefined; }',
      '{ [__optional]?: 1; }',
      '{ [__hidden]?: 1 | undefined; }',
      '{ [__hidden]?: 1; }',
    ];

    for (const tag of genericTags) {
      type = type.replace(tag, '$1');
    }

    for (const tag of intersectionTags) {
      type = type.replace(' & ' + tag, '');
      type = type.replace(tag + ' & ', '');
    }

    return type;
  }

  private initPropertyType(meta: EntityMetadata, prop: EntityProperty): void {
    const { type: typeRaw, optional } = this.readTypeFromSource(meta, prop);
    const type = this.cleanUpTypeTags(typeRaw);
    prop.type = type;
    prop.runtimeType = type as 'string';

    if (optional) {
      prop.optional = true;
    }

    this.processWrapper(prop, 'Ref');
    this.processWrapper(prop, 'Reference');
    this.processWrapper(prop, 'ScalarReference');
    this.processWrapper(prop, 'Ref');
    this.processWrapper(prop, 'Collection');

    if (prop.type.replace(/import\(.*\)\./g, '').match(/^(Dictionary|Record)<.*>$/)) {
      prop.type = 'json';
    }
  }

  private readTypeFromSource(meta: EntityMetadata, prop: EntityProperty): { type: string; optional?: boolean } {
    const source = this.getExistingSourceFile(meta.path);
    const cls = source.getClass(meta.className);

    /* istanbul ignore next */
    if (!cls) {
      throw new MetadataError(`Source class for entity ${meta.className} not found. Verify you have 'compilerOptions.declaration' enabled in your 'tsconfig.json'. If you are using webpack, see https://bit.ly/35pPDNn`);
    }

    const properties = cls.getInstanceProperties();
    const property = properties.find(v => v.getName() === prop.name) as PropertyDeclaration;

    if (!property) {
      return { type: prop.type, optional: prop.nullable };
    }

    const tsType = property.getType();
    const typeName = tsType.getText(property);

    if (prop.enum && tsType.isEnum()) {
      prop.items = tsType.getUnionTypes().map(t => t.getLiteralValueOrThrow()) as string[];
    }

    if (tsType.isArray()) {
      prop.array = true;

      /* istanbul ignore else */
      if (tsType.getArrayElementType()!.isEnum()) {
        prop.items = tsType.getArrayElementType()!.getUnionTypes().map(t => t.getLiteralValueOrThrow()) as string[];
      }
    }

    if (prop.array && prop.enum) {
      prop.enum = false;
    }

    let type = typeName;
    const union = type.split(' | ');
    const optional = property.hasQuestionToken?.() || union.includes('null') || union.includes('undefined') || tsType.isNullable();
    type = union.filter(t => !['null', 'undefined'].includes(t)).join(' | ');

    prop.array ??= type.endsWith('[]') || !!type.match(/Array<(.*)>/);
    type = type
      .replace(/Array<(.*)>/, '$1') // unwrap array
      .replace(/\[]$/, '')          // remove array suffix
      .replace(/\((.*)\)/, '$1');   // unwrap union types

    // keep the array suffix in the type, it is needed in few places in discovery and comparator (`prop.array` is used only for enum arrays)
    if (prop.array && !type.includes(' | ') && prop.kind === ReferenceKind.SCALAR) {
      type += '[]';
    }

    return { type, optional };
  }

  private getSourceFile(path: string, validate: boolean): SourceFile | undefined {
    if (!this.sources) {
      this.initSourceFiles();
    }

    path = Utils.stripRelativePath(path);
    const source = this.sources.find(s => s.getFilePath().endsWith(path));

    if (!source && validate) {
      throw new MetadataError(`Source file '${path}' not found. Check your 'entities' option and verify you have 'compilerOptions.declaration' enabled in your 'tsconfig.json'. If you are using webpack, see https://bit.ly/35pPDNn`);
    }

    return source;
  }

  private processWrapper(prop: EntityProperty, wrapper: string): void {
    // type can be sometimes in form of:
    // `'({ object?: Entity | undefined; } & import("...").Reference<Entity>)'`
    // `{ object?: import("...").Entity | undefined; } & import("...").Reference<Entity>`
    // `{ node?: ({ id?: number | undefined; } & import("...").Reference<import("...").Entity>) | undefined; } & import("...").Reference<Entity>`
    // the regexp is looking for the `wrapper`, possible prefixed with `.` or wrapped in parens.
    const type = prop.type
      .replace(/import\(.*\)\./g, '')
      .replace(/\{ .* } & ([\w &]+)/g, '$1');
    const m = type.match(new RegExp(`(?:^|[.( ])${wrapper}<(\\w+),?.*>(?:$|[) ])`));

    if (!m) {
      return;
    }

    prop.type = m[1];

    if (['Ref', 'Reference', 'Ref'].includes(wrapper)) {
      prop.ref = true;
    }
  }

  private initProject(): void {
    try {
      this.project = new Project();
    } catch (e: any) {
      this.config.getLogger().warn('discovery', e.message);
      this.project = new Project();
    }
  }

  private initSourceFiles(): void {
    if (!this.project) {
      this.initProject();
    }

    const paths = Object.values(MetadataStorage.getMetadata())
        .map(m => m.path);

    const sources = [];
    for (const path of paths) {
      sources.push(this.project.addSourceFileAtPath(path));
    }

    this.sources = sources;
  }

}
