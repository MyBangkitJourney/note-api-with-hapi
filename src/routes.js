const Hapi = require('@hapi/hapi');
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

/**
 * Represents an array of route configurations for a Hapi server.
 * @type {Hapi.ServerRoute<Hapi.ReqRefDefaults>[]}
 */
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.response({
        status: 'success',
        message: 'Hello world!',
      });
    },
  },
  {
    method: 'POST',
    path: '/notes',
    handler: (request, h) => {
      return addNoteHandler(request, h);
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
