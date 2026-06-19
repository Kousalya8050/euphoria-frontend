import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './VideoLessonsPage.css';
import Footer from "./Footer_page";
import banner from './assets/homepage/banner_for_landing.jpg';

Modal.setAppElement('#root');

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const VideoLessons = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' (Videos) or 'shorts'

  useEffect(() => {
    document.title = "Video Lessons | MindWork360";
  }, []);

  // Format ISO duration (e.g. PT5M30S -> 5:30)
  const formatDuration = (isoDuration) => {
    if (!isoDuration) return '';
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    
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
      // Endpoint matches the backend type ('lessons' or 'shorts')
      const res = await axios.get(`${API_URL}/api/youtube/${activeTab}`);
      const all = res.data.data || [];

      setAllVideos(all);
      setVideos(all.slice(0, 12)); // Initial load of 12 items
    } catch (error) {
      console.error("Error loading videos", error);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleLoadMore = () => {
    const currentCount = videos.length;
    const nextItems = allVideos.slice(currentCount, currentCount + 12);
    setVideos(prev => [...prev, ...nextItems]);
  };

  return (
    <div className="video-lessons-container">
      <h3 className="video_heading_h3">Video Lessons</h3>
      <div className="lessons-hero-banner">
        <img src={banner} alt="Video Lessons Banner" className="lessons-hero-bg" />
        <div className="lessons-hero-overlay"></div>
      </div>

      <div className="tab-buttons">
        <button
          className={activeTab === 'lessons' ? 'active-tab' : ''}
          onClick={() => setActiveTab('lessons')}
        >
          Videos
        </button>
        <button
          className={activeTab === 'shorts' ? 'active-tab' : ''}
          onClick={() => setActiveTab('shorts')}
        >
          Shorts
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading {activeTab}...</div>
      ) : (
        <>
          <div className="video-grid">
            {videos.map((item) => {
              // IMPORTANT: Extract ID correctly. Playlist items hide the VideoID here:
              const videoId = item.snippet?.resourceId?.videoId || item.id;
              
              return (
                <div
                  key={item.id}
                  className="video-card"
                  onClick={() => setSelectedVideo(videoId)}
                >
                  <div className="thumbnail-wrapper">
                    <img
                      src={item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url}
                      alt={item.snippet?.title}
                    />
                    <span className="video-duration">
                      {activeTab === "shorts" ? "Short" : formatDuration(item.contentDetails?.duration)}
                    </span>
                  </div>
                  <div className="video-title">{item.snippet?.title || 'Untitled'}</div>
                </div>
              );
            })}
          </div>

          <div className="load-more-container">
            {videos.length < allVideos.length && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
          <Footer />
        </>
      )}

      <Modal
        isOpen={!!selectedVideo}
        onRequestClose={() => setSelectedVideo(null)}
        className="video-modal"
        overlayClassName="video-overlay"
      >
        {selectedVideo && (
          <div className="modal-player-wrapper">
            <button className="close-modal-btn" onClick={() => setSelectedVideo(null)}>×</button>
            <iframe
              title="YouTube Player"
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

export default VideoLessons;