import { DraftState } from '@/types/hero';

export interface SavedDraft {
  id: string;
  name: string;
  date: string;
  draft: DraftState;
}

// Save draft to localStorage
export function saveDraft(name: string, draft: DraftState): SavedDraft {
  const savedDrafts = getSavedDrafts();
  const newDraft: SavedDraft = {
    id: Date.now().toString(),
    name,
    date: new Date().toISOString().split('T')[0],
    draft
  };
  
  savedDrafts.push(newDraft);
  localStorage.setItem('mlbb-drafts', JSON.stringify(savedDrafts));
  
  return newDraft;
}

// Get all saved drafts
export function getSavedDrafts(): SavedDraft[] {
  const draftsJson = localStorage.getItem('mlbb-drafts');
  return draftsJson ? JSON.parse(draftsJson) : [];
}

// Get a specific draft by ID
export function getDraftById(id: string): SavedDraft | null {
  const drafts = getSavedDrafts();
  return drafts.find(draft => draft.id === id) || null;
}

// Delete a draft
export function deleteDraft(id: string): void {
  const drafts = getSavedDrafts();
  const updatedDrafts = drafts.filter(draft => draft.id !== id);
  localStorage.setItem('mlbb-drafts', JSON.stringify(updatedDrafts));
}

// Update a draft
export function updateDraft(id: string, updates: Partial<SavedDraft>): SavedDraft | null {
  const drafts = getSavedDrafts();
  const index = drafts.findIndex(draft => draft.id === id);
  
  if (index === -1) return null;
  
  const updatedDraft = {
    ...drafts[index],
    ...updates,
    date: new Date().toISOString().split('T')[0]
  };
  
  drafts[index] = updatedDraft;
  localStorage.setItem('mlbb-drafts', JSON.stringify(drafts));
  
  return updatedDraft;
}

// Generate a shareable link for a draft
export function generateShareableLink(draft: SavedDraft): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/draft?id=${draft.id}`;
}

// Load a draft from a shareable link
export function loadDraftFromLink(id: string): SavedDraft | null {
  return getDraftById(id);
} 