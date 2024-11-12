import { toTime } from '@/lib/utils';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface IDraft {
  docId: string,
  draftId: string,
  title: string,
  content: string,
  createdAt: string,
  isMerged: boolean
}

interface SyncDraftDB extends DBSchema {
  drafts: {
    key: string,
    value: IDraft
  }
}

export const useLocalDB = () => {
  const openIndexedDB = async (userId: string | undefined) : Promise<IDBPDatabase<SyncDraftDB> | undefined>=> {
    try {
      if (!userId) return;

      const db = await openDB<SyncDraftDB>(userId, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('drafts')) {
            db.createObjectStore('drafts' , {
              keyPath: 'draftId'
            });
          }
        }
      })
      

      console.log(`[IndexedDB] Opened db - ${db.version}`)
      return db;
    } catch (error) {
      console.log(`[IndexedDB] Error while opening: ${error}`);
    }
  }

  const createDraft = async (
    db: IDBPDatabase<SyncDraftDB>,
    docId: string,
    draftId: string,
    initialContent: string,
    title: string = 'Untitled',
  ) : Promise<void> => {
    try {
      await db.add('drafts', {
        docId: docId,
        draftId: draftId,
        title: title,
        content: initialContent,
        createdAt: toTime((new Date()).toString()),
        isMerged: false
      })
    } catch (error) {
      console.log(`[IndexedDB] Error while creating: ${error}`);
    }
  }

  const updateDraft = async (
    db: IDBPDatabase<SyncDraftDB>,
    draftId: string,
    updatedContent: string = ''
  ) : Promise<void> => {
    try {
      const oldDraft = await db.get('drafts', draftId);

      if (!oldDraft) {
        throw new Error('NOT_FOUND');
      }

      await db.put('drafts', {
        docId: oldDraft.docId,
        draftId: oldDraft.draftId,
        title: oldDraft.title,
        content: updatedContent,
        createdAt: oldDraft.createdAt,
        isMerged: oldDraft.isMerged
      })
    } catch (error) {
      console.log(`[IndexedDB] Error while updating: ${error}`);
    }
  } 

  const updateDraftTitle = async (
    db: IDBPDatabase<SyncDraftDB>,
    draftId: string,
    updatedTitle: string
  ) : Promise<void> => {
    try {
      const oldDraft = await db.get('drafts', draftId);

      if (!oldDraft) {
        throw new Error('NOT_FOUND');
      }

      await db.put('drafts', {
        docId: oldDraft.docId,
        draftId: oldDraft.draftId,
        title: updatedTitle,
        content: oldDraft.content,
        createdAt: oldDraft.createdAt,
        isMerged: oldDraft.isMerged
      })
    } catch (error) {
      console.log(`[IndexedDB] Error while updating: ${error}`);
    }
  } 

  const getDraftById = async (
    db: IDBPDatabase<SyncDraftDB>,
    draftId: string,
  ): Promise<IDraft | undefined> => {
    try {
      return await db.get('drafts', draftId);
    } catch (error) {
      console.log(`[IndexedDB] Error while getting: ${error}`);
    }
  }

  const getDraftsByDocId = async (
    db: IDBPDatabase<SyncDraftDB>,
    docId: string
  ): Promise<IDraft[] | undefined> => {
    try {
      const drafts = await db.getAll('drafts');

      return drafts.filter(draft => draft.docId === docId);
    } catch (error) {
      console.log(`[IndexedDB] Error while getting all: ${error}`);
    }
  }

  return {
    openIndexedDB,
    createDraft,
    updateDraft,
    updateDraftTitle,
    getDraftById,
    getDraftsByDocId
  }
}
