import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncGetDetailNote, asyncDeleteNote } from '../states/notes/thunk';
import { postedAt } from '../utils';

function NoteDetailPage() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailNote = useSelector((state) => state.notes.detailNote);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncGetDetailNote({ noteId })); // Mengirim noteId sebagai string
  }, [dispatch, noteId]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/shared/notes/${noteId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };

  if (!detailNote) {
    return <div>Loading...</div>;
  }

  const isOwner = authUser && detailNote.ownerId === authUser.id;

  if (isOwner) {
    return (
      <div className="p-8">
        <div className="flex flex-col min-h-[80vh] p-10 bg-card1 rounded-lg">
          <div className="flex flex-col justify-between p-10 h-full">
            <div>
              <h2 className="text-2xl font-bold text-text">
                {detailNote.title}
              </h2>
              <p className="text-text">{postedAt(detailNote.createdAt)}</p>
              <p className="text-text">{detailNote.body}</p>
            </div>
            <div className="mt-4 flex flex-row gap-5">
              <button
                className="py-2 px-4 bg-bekgron text-text rounded-lg hover:bg-text hover:text-bekgron"
                onClick={() => navigate('/notes')}
              >
                Back to Notes
              </button>
              <button
                className="py-2 px-4 bg-bekgron text-text rounded-lg hover:bg-text hover:text-bekgron"
                onClick={() => {
                  dispatch(asyncDeleteNote({ noteId }));
                  navigate('/');
                }}
              >
                Delete Note
              </button>
              <button
                className="py-2 px-4 bg-bekgron text-text rounded-lg hover:bg-text hover:text-bekgron"
                onClick={handleCopyLink}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-40 items-center min-h-screen min-w-full gap-10 justify-between">
      <div className="flex flex-col gap-4 bg-card2 px-10 py-4 rounded-2xl min-w-[60rem]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-text">{detailNote.title}</h2>
          <p className="text-text text-sm">{postedAt(detailNote.createdAt)}</p>
        </div>
        <p className="text-text">{detailNote.body}</p>
      </div>

      <button
        className=" bg-card4 text-text rounded-lg px-8 py-2 hover:bg-text hover:text-bekgron"
        onClick={handleCopyLink}
      >
        Copy Link
      </button>
    </div>
  );
}

export default NoteDetailPage;
