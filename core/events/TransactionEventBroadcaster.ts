import type { Transaction } from '../connections/index.ts';
import type { EntityManager } from '../EntityManager.ts';
import type { TransactionEventType } from '../enums.ts';
import type { UnitOfWork } from '../unit-of-work/index.ts';
import type { EventManager } from './EventManager.ts';

export class TransactionEventBroadcaster {

  private readonly eventManager: EventManager;

  constructor(private readonly em: EntityManager,
              private readonly uow?: UnitOfWork,
              readonly context?: { topLevelTransaction?: boolean }) {
    this.eventManager = this.em.getEventManager();
  }

  async dispatchEvent(event: TransactionEventType, transaction?: Transaction) {
    await this.eventManager.dispatchEvent(event, { em: this.em, transaction, uow: this.uow });
  }

  isTopLevel(): boolean {
    return !!this.context?.topLevelTransaction;
  }

}
