export const toEventDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const normalizeEvent = (event) => {
  const eventDate = toEventDate(event.date || event.eventDate || event.startsAt);
  const type = String(event.eventType || event.primaryGenre || event.category || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") || "event";

  const themeMap = {
    festival: "purple",
    concert: "orange",
    indie: "green",
    "club-night": "blue",
    club: "blue",
  };

  return {
    ...event,
    type,
    tag: String(event.primaryGenre || event.eventType || event.category || "EVENT").toUpperCase(),
    subtitle: event.tagline || event.description || "No description yet.",
    dateLabel: eventDate
      ? eventDate.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Date not set",
    venue: event.venue || "Venue not set",
    attendeeCount: Number(event.attendeeCount || 0),
    theme: themeMap[type] || "green",
    eventDate,
  };
};

export const eventMatchesSearch = (event, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  if (!normalizedSearch) return true;

  return [event.title, event.subtitle, event.venue, event.tag, event.eventType, event.primaryGenre]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(normalizedSearch));
};
