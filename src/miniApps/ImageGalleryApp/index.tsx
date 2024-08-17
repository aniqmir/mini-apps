import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

// icons
import { TbArrowsRandom } from 'react-icons/tb';
import { MdAdd, MdDownloading, MdSearch } from 'react-icons/md';

import Loader from '../../components/Generic/Loader';
import Card from '../../components/ImageGalleryApp/Card';

async function fetchWithAuth(url: string, token: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${token}`, // Authorization header with token
        'Content-Type': 'application/json', // Add more headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow or handle the error as needed
  }
}

const ImageGalleryApp = () => {
  const [photos, setPhotos] = useState<any>([]);
  const [nextPage, setNextPage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const baseURL = 'https://api.pexels.com/v1';
  const apiKey = import.meta.env.VITE_IMAGES_API_KEY;

  const curatedUrl = `${baseURL}/curated`;
  const searchUrl = `${baseURL}/search?query=${searchQuery}&orientation=landscape`;

  const getImages = (
    event: FormEvent,
    url: string,
    keepPreviousImages: boolean,
  ) => {
    event.preventDefault();

    setSearchQuery('');

    const result = fetchWithAuth(url, apiKey);

    setLoading(true);
    result
      .then((res) => {
        setLoading(false);
        setNextPage(res.next_page);

        let photosToSet = [];

        if (keepPreviousImages) {
          photosToSet = [...photos, ...res.photos];
        } else {
          photosToSet = [...res.photos];
        }

        setPhotos(photosToSet);

        toast.success('Images loaded!');
      })
      .catch(() => {
        setLoading(false);
        toast.error('Some Error Occurred');
      });
  };

  return (
    <div className='m-10 md:m-24 md:flex-col justify-center items-center space-y-10 '>
      <button
        className='bg-slate-800 text-slate-100 p-2 rounded-xl w-full sm:w-auto'
        onClick={(e) => getImages(e, curatedUrl, false)}
      >
        <TbArrowsRandom size={20} />
      </button>

      <form
        className='grid grid-cols-1'
        onSubmit={(e) => getImages(e, searchUrl, false)}
      >
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search images...'
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
        />
        <button
          type='submit'
          className='col-start-10 ml-10 p-5 bg-slate-900 text-slate-100 rounded-full'
        >
          {loading ? <MdDownloading size={20} /> : <MdSearch size={20} />}
        </button>
      </form>
      <div className='grid grid-cols-1 justify-center items-center md:grid-cols-4 gap-10'>
        {photos.map((photo: any) => (
          <Card image={photo} />
        ))}
        <div className='flex justify-center'>
          {photos.length !== 0 && (
            <button
              onClick={(e) => getImages(e, nextPage, true)}
              className='flex items-center justify-center gap-x-3 p-2 bg-slate-900 h-10 w-10 text-slate-100 rounded-full'
            >
              {loading ? <Loader /> : <MdAdd size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageGalleryApp;
