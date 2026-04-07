// apps/web/src/firebase/events.js

import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy
} from 'firebase/firestore';

// ============================================
// CREATE EVENT - Organizer creates a new event
// ============================================
export const createEvent = async (eventData, organizerId) => {
  try {
    const event = {
      ...eventData,
      organizerId: organizerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attendeeCount: 0
    };
    
    const docRef = await addDoc(collection(db, 'events'), event);
    return { id: docRef.id, ...event };
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// ============================================
// GET ALL EVENTS - For attendees browsing
// ============================================
export const getEvents = async () => {
  try {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('Error getting events:', error);
    throw error;
  }
};

// ============================================
// GET SINGLE EVENT BY ID - For event details page
// ============================================
export const getEventById = async (eventId) => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting event:', error);
    throw error;
  }
};

// ============================================
// GET EVENTS BY ORGANIZER - For organizer dashboard
// ============================================
export const getEventsByOrganizer = async (organizerId) => {
  try {
    const q = query(
      collection(db, 'events'), 
      where('organizerId', '==', organizerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('Error getting organizer events:', error);
    throw error;
  }
};

// ============================================
// UPDATE EVENT - Organizer edits their event
// ============================================
export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: new Date().toISOString()
    });
    return { id: eventId, ...eventData };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// ============================================
// DELETE EVENT - Organizer deletes their event
// ============================================
export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// ============================================
// REGISTER ATTENDEE FOR EVENT
// ============================================
export const registerForEvent = async (userId, eventId) => {
  try {
    // Check if already registered (prevent duplicates)
    const q = query(
      collection(db, 'registrations'),
      where('userId', '==', userId),
      where('eventId', '==', eventId)
    );
    const existing = await getDocs(q);
    
    if (!existing.empty) {
      throw new Error('You are already registered for this event');
    }
    
    // Add registration
    const registration = {
      userId: userId,
      eventId: eventId,
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const docRef = await addDoc(collection(db, 'registrations'), registration);
    
    // Update attendee count on event
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    const currentCount = eventDoc.data().attendeeCount || 0;
    await updateDoc(eventRef, { attendeeCount: currentCount + 1 });
    
    return { id: docRef.id, ...registration };
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

// ============================================
// GET REGISTRATIONS FOR AN EVENT - For organizer to see attendees
// ============================================
export const getRegistrationsByEvent = async (eventId) => {
  try {
    const q = query(collection(db, 'registrations'), where('eventId', '==', eventId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('Error getting registrations:', error);
    throw error;
  }
};

// ============================================
// GET EVENTS REGISTERED BY USER - For attendee "My Events"
// ============================================
export const getEventsByUser = async (userId) => {
  try {
    // Get all registrations for this user
    const q = query(collection(db, 'registrations'), where('userId', '==', userId));
    const registrations = await getDocs(q);
    
    // Get full event details for each registration
    const events = [];
    for (const reg of registrations.docs) {
      const registrationData = reg.data();
      const eventDoc = await getDoc(doc(db, 'events', registrationData.eventId));
      if (eventDoc.exists()) {
        events.push({
          registrationId: reg.id,
          ...registrationData,
          event: { id: eventDoc.id, ...eventDoc.data() }
        });
      }
    }
    return events;
  } catch (error) {
    console.error('Error getting user events:', error);
    throw error;
  }
};

// ============================================
// CHECK IF USER IS REGISTERED FOR EVENT
// ============================================
export const isUserRegistered = async (userId, eventId) => {
  try {
    const q = query(
      collection(db, 'registrations'),
      where('userId', '==', userId),
      where('eventId', '==', eventId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking registration:', error);
    return false;
  }
};

// ============================================
// CANCEL REGISTRATION
// ============================================
export const cancelRegistration = async (registrationId, eventId) => {
  try {
    await deleteDoc(doc(db, 'registrations', registrationId));
    
    // Decrease attendee count
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    const currentCount = eventDoc.data().attendeeCount || 0;
    await updateDoc(eventRef, { attendeeCount: Math.max(0, currentCount - 1) });
    
    return true;
  } catch (error) {
    console.error('Error canceling registration:', error);
    throw error;
  }
};

