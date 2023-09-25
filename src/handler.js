const { nanoid } = require('nanoid');
const Hapi = require('@hapi/hapi');
const notes = require('./notes');

/**
 *
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  if (notes.find((note) => note.id === id)) {
    const responseSucces = {
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    };

    return h.response(responseSucces).code(201);
  }

  const responseFail = {
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  };

  return h.response(responseFail).code(500);
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

/**
 *
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id).at(0);

  if (note !== undefined) {
    const responseNote = {
      status: 'success',
      data: {
        note,
      },
    };

    return h.response(responseNote).code(200);
  }

  const responseFail = {
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  };
  responseFail;

  return h.response(responseFail).code(404);
};

/**
 *
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    })
    .code(404);
};

/**
 *
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};
