/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {string} location
 * @property {string} organizerId
 * @property {string} coverImage
 * @property {number} capacity
 * @property {number} price
 * @property {'draft' | 'published' | 'cancelled'} status
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'attendee' | 'organizer' | 'admin'} role
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} eventId
 * @property {string} userId
 * @property {number} quantity
 * @property {'pending' | 'confirmed' | 'cancelled'} status
 */

export {}