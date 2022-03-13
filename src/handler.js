const nanoid = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {tittle, tags, body} = request.payload;
  const id = nanoid.nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    tittle, tags, body, id, createdAt, updateAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note added sucessfully!',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to be added',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteHandler = (request, h) => {
  const {id} = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Note is not found',
  });
  response.code(404);
  return response;
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteHandler};
