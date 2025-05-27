import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Business } from '../store/businessStore';
import { UserPreferences } from '../store/preferencesStore';

// User Preferences
export const saveUserPreferences = async (userId: string, preferences: UserPreferences) => {
  try {
    await setDoc(doc(db, 'preferences', userId), preferences);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  try {
    const docRef = await getDoc(doc(db, 'preferences', userId));
    return docRef.exists() ? docRef.data() as UserPreferences : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Saved Hustles
export const saveBusiness = async (userId: string, business: Business) => {
  try {
    await setDoc(doc(db, 'users', userId, 'savedHustles', business.id), business);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSavedHustles = async (userId: string): Promise<Business[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'savedHustles'));
    return querySnapshot.docs.map(doc => doc.data() as Business);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeSavedHustle = async (userId: string, businessId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'savedHustles', businessId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Notes and Progress
export const updateBusinessNotes = async (
  userId: string,
  businessId: string,
  notes: string
) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'savedHustles', businessId), { notes });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateBusinessProgress = async (
  userId: string,
  businessId: string,
  progress: string
) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'savedHustles', businessId), { progress });
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 