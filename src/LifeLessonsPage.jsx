import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Using react-modal as requested
import './LifeLessonsPage.css';
import Footer from "./Footer_page";
import video_lesson1 from './assets/video_lessonspage/video_lesson1.png';

Modal.setAppElement('#root');

// const API_KEY = 'AIzaSyCngySm9tpqUTHvEqP6jaOHUsDVlov3AKI';
// const CHANNEL_ID = 'UC9pRPRlo6wIOakEOi_2RWwA'; 



const LifeLessons = () => {

useEffect(() => {
    document.title = "Life Lessons | Euphoria";
 }, []);

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore] = useState(false);
  // const [nextPageToken, setNextPageToken] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' or 'shorts'

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchVideos_l('', true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  // const fetchVideos = async (pageToken = '', isNewTab = false) => {
  //   if (pageToken) setLoadingMore(true);
  //   else setLoading(true);

  //   try {
  //     const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
  //       params: {
  //         key: API_KEY,
  //         channelId: CHANNEL_ID,
  //         part: 'snippet',
  //         order: 'date',
  //         maxResults: 50,
  //         type: 'video',
  //         pageToken: pageToken,
  //       }
  //     });

  //     const videoIds = searchRes.data.items.map(item => item.id.videoId).join(',');

  //     const videosRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
  //       params: {
  //         key: API_KEY,
  //         id: videoIds,
  //         part: 'snippet,statistics,contentDetails',
  //       }
  //     });

  //     const filtered = videosRes.data.items.filter(video => {
  //       const duration = video.contentDetails.duration;
  //       const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  //       const totalSeconds =
  //         (parseInt(match[1] || 0) * 3600) +
  //         (parseInt(match[2] || 0) * 60) +
  //         (parseInt(match[3] || 0));

  //       return activeTab === 'shorts' ? totalSeconds < 60 : totalSeconds >= 60;
  //     });

  //     const nextSet = filtered.slice(0, 10); // Show only first 10 relevant
  //     setNextPageToken(searchRes.data.nextPageToken || '');

  //     setVideos(prev => isNewTab ? nextSet : [...prev, ...nextSet]);
  //   } catch (err) {
  //     console.error('Error fetching videos', err);
  //   } finally {
  //     setLoading(false);
  //     setLoadingMore(false);
  //   }
  // };

  // const fetchVideos = async () => {
  //   setLoading(true);
  
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/youtube/${activeTab}`
  //     );
  
  //     setVideos(res.data.data.slice(0, 15)); // show first 15
  //   } catch (error) {
  //     console.error("Error loading videos", error);
  //   }
  
  //   setLoading(false);
  // };
  const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

  const fetchVideos_l = async () => {
    setLoading(true);
  
    try {
      const res = await axios.get(
        `${API_URL}/api/youtube_l/${activeTab}`
      );
  
      const all = res.data.data || [];
  
      setAllVideos(all);          // store everything
      setVideos(all.slice(0, 10)); // show first 10
    } catch (error) {
      console.error("Error loading videos", error);
    }
  
    setLoading(false);
  };
  
  const handleLoadMore = () => {
    const currentCount = videos.length;
  
    const nextItems = allVideos.slice(currentCount, currentCount + 10);
  
    setVideos(prev => [...prev, ...nextItems]);
  };

  // const handleLoadMore = () => {
  //   if (nextPageToken) fetchVideos(nextPageToken);
  // };

  return (
    <div className="life-lessons-container">
      <h3 className="life_heading_h3">Life Lessons</h3>
      <div className="first_img_container_l">
        <img className="first_image_l" src={video_lesson1} alt="Life Lessons Banner" />
      </div>

      

      <div className="tab-buttons_l">
        <button
          className={activeTab === 'lessons' ? 'active-tab' : ''}
          onClick={() => setVideos([]) || setActiveTab('lessons')}
        >
          Videos
        </button>
        <button
          className={activeTab === 'shorts' ? 'active-tab' : ''}
          onClick={() => setVideos([]) || setActiveTab('shorts')}
        >
          Shorts
        </button>
      </div>

      {loading ? (
        <div className="loading-state_l">Loading {activeTab}...</div>
      ) : (
        <>
          <div className="video-grid_l">
            {videos.map(video => (
              <div key={video.id} className="video-card_l" onClick={() => setSelectedVideo(video.id)}>
                <div className="thumbnail-wrapper_l">
                  <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                  <span className="video-duration_l">{formatDuration(video.contentDetails.duration)}</span>
                </div>
                <div className="video-title_l">{video.snippet.title}</div>
                <div className="video-meta_l">
                  <span>{parseInt(video.statistics.viewCount).toLocaleString()} Views</span>
                  <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="load-more-container_l">
          {videos.length < allVideos.length && (
  <button onClick={handleLoadMore} disabled={loadingMore}>
    {loadingMore ? 'Loading...' : 'Load More'}
  </button>
)}
<Footer />
          </div>
          
        </>
      )}

      <Modal
        isOpen={!!selectedVideo}
        onRequestClose={() => setSelectedVideo(null)}
        className="video-modal_l"
        overlayClassName="video-overlay_l"
        contentLabel="Video Player Modal"
      >
        {selectedVideo && (
          <div className="modal-player-wrapper_l">
            <iframe
              title="YouTube Video Player"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
      
    </div>
  );
};

export default LifeLessons;