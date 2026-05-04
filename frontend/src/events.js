import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";

export const createEvent = async (eventData, organizerId) => {
  const payload = {
    ...eventData,
    organizerId,
    attendeeCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "events"), payload);
  return { id: docRef.id, ...payload };
};

export const getEvents = async () => {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((eventDoc) => ({ id: eventDoc.id, ...eventDoc.data() }));
};

export const getEventById = async (eventId) => {
  const snapshot = await getDoc(doc(db, "events", eventId));
  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
};

export const getEventsByOrganizer = async (organizerId) => {
  const organizerQuery = query(
    collection(db, "events"),
    where("organizerId", "==", organizerId),
  );
  const snapshot = await getDocs(organizerQuery);
  return snapshot.docs.map((eventDoc) => ({ id: eventDoc.id, ...eventDoc.data() }));
};

export const updateEvent = async (eventId, eventData) => {
  await updateDoc(doc(db, "events", eventId), {
    ...eventData,
    updatedAt: serverTimestamp(),
  });

  return { id: eventId, ...eventData };
};

export const deleteEvent = async (eventId) => {
  await deleteDoc(doc(db, "events", eventId));
  return true;
};

export const registerForEvent = async (userId, eventId) => {
  const registrationQuery = query(
    collection(db, "registrations"),
    where("userId", "==", userId),
    where("eventId", "==", eventId),
  );
  const existing = await getDocs(registrationQuery);

  if (!existing.empty) {
    throw new Error("You are already registered for this event");
  }

  const registration = {
    userId,
    eventId,
    status: "confirmed",
    registeredAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "registrations"), registration);

  const eventRef = doc(db, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);
  const currentCount = eventSnapshot.data()?.attendeeCount || 0;
  await updateDoc(eventRef, { attendeeCount: currentCount + 1, updatedAt: serverTimestamp() });

  return { id: docRef.id, ...registration };
};

export const getEventsByUser = async (userId) => {
  const registrationQuery = query(
    collection(db, "registrations"),
    where("userId", "==", userId),
  );
  const registrations = await getDocs(registrationQuery);

  const events = [];
  for (const registrationDoc of registrations.docs) {
    const registrationData = registrationDoc.data();
    const eventData = await getEventById(registrationData.eventId);
    if (eventData) {
      events.push({
        registrationId: registrationDoc.id,
        ...registrationData,
        event: eventData,
      });
    }
  }

  return events;
};