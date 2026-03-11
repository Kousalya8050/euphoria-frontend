import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Using react-modal as requested
import './VideoLessonsPage.css';
import Footer from "./Footer_page";
import video_lesson1 from './assets/video_lessonspage/video_lesson1.png';

Modal.setAppElement('#root');

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";



const VideoLessons = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore] = useState(false);
  // const [nextPageToken, setNextPageToken] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('playlists'); // 'lessons' or 'shorts'

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
  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const url =
  activeTab === "shorts"
    ? `${API_URL}/api/youtube/shorts`
    : `${API_URL}/api/youtube/playlists`;

      const res = await axios.get(url);
      const all = res.data.data || [];

      setAllVideos(all);
      setVideos(all.slice(0, 10));
    } catch (error) {
      console.error("Error loading videos", error);
    }
    setLoading(false);
  }, [activeTab]);
  useEffect(() => {
    setVideos([]); 
    fetchVideos();
  }, [activeTab, fetchVideos]);

  
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

  // const fetchVideos = async () => {
  //   setLoading(true);
  
  //   try {
  //     const url = 
  //       activeTab === "shorts"
  //         ? "http://localhost:3000/api/youtube/shorts"
  //         : "http://localhost:3000/api/youtube/playlists";
  
  //     const res = await axios.get(url);
  
  //     const all = res.data.data || [];
  
  //     setAllVideos(all);
  //     setVideos(all.slice(0, 10));
  //   } catch (error) {
  //     console.error("Error loading videos", error);
  //   }
  
  //   setLoading(false);
  // };
  const handleLoadMore = () => {
    const currentCount = videos.length;
  
    const nextItems = allVideos.slice(currentCount, currentCount + 10);
  
    setVideos(prev => [...prev, ...nextItems]);
  };

  // const handleLoadMore = () => {
  //   if (nextPageToken) fetchVideos(nextPageToken);
  // };

  return (
    <div className="video-lessons-container">
      <h3 className="video_heading_h3">Video Lessons</h3>
      <div className="first_img_container">
        <img className="first_image" src={video_lesson1} alt="Video Lessons Banner" />
      </div>

      

      <div className="tab-buttons">
  <button
    className={activeTab === 'playlists' ? 'active-tab' : ''}
    onClick={() => {
      setVideos([]);
      setActiveTab('playlists');
    }}
  >
    Videos
  </button>

  <button
    className={activeTab === 'shorts' ? 'active-tab' : ''}
    onClick={() => {
      setVideos([]);
      setActiveTab('shorts');
    }}
  >
    Shorts
  </button>
</div>
      {loading ? (
        <div className="loading-state">Loading {activeTab}...</div>
      ) : (
        <>
        
          <div className="video-grid">
  {videos.map(item => (
    
    <div
      key={item.id}
      className="video-card"
      onClick={() => setSelectedVideo(item.id)}
    >
      <div className="thumbnail-wrapper">
        <img
          src={item.snippet?.thumbnails?.medium?.url || 'fallback_image.png'}
          alt={item.snippet?.title || 'Video'}
        />

        {/* Shorts show duration | Playlists show count */}
        {activeTab === "shorts" ? (
          <span className="video-duration">
            {item.contentDetails?.duration ? formatDuration(item.contentDetails.duration) : '0:00'}
          </span>
        ) : (
          <span className="video-duration">
            {item.contentDetails?.itemCount ?? 0}{" "}
            {(item.contentDetails?.itemCount ?? 0) === 1 ? "Video" : "Videos"}
          </span>
        )}
      </div>

      <div className="video-title">{item.snippet?.title || 'Untitled'}</div>
    </div>
  ))}
</div>


          <div className="load-more-container">
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
  className="video-modal"
  overlayClassName="video-overlay"
  contentLabel="Video Player Modal"
>
  {selectedVideo && (
    <div className="modal-player-wrapper">
      <iframe
        title="YouTube Player"
        src={
          activeTab === "shorts"
            ? `https://www.youtube.com/embed/${selectedVideo}?autoplay=1`
            : `https://www.youtube.com/embed/videoseries?list=${selectedVideo}&autoplay=1`
        }
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

export default VideoLessons;