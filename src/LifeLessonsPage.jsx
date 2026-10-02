import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import './LifeLessonsPage.css';
import Footer from "./Footer_page";
import banner from './assets/homepage/banner_for_landing.jpg';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const formatDuration = (isoDuration) => {
  const match = (isoDuration || '').match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const thumbnailUrl = (snippet) =>
  snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;

const LifeLessons = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Player view: the open playlist, its videos, and which one is playing
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/youtube/playlists`);
        const all = res.data.data || [];
        setPlaylists(all.filter(p => p.contentDetails?.itemCount > 0));
      } catch (error) {
        console.error("Error loading playlists", error);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  const openPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist);
    setPlaylistVideos([]);
    setCurrentIndex(0);
    setLoadingVideos(true);
    window.scrollTo({ top: playerRef.current?.offsetTop ?? 0, behavior: 'smooth' });

    try {
      const res = await axios.get(`${API_URL}/api/youtube/playlists/${playlist.id}/videos`);
      setPlaylistVideos(res.data.data || []);
    } catch (error) {
      console.error("Error loading playlist videos", error);
    }
    setLoadingVideos(false);
  };

  const closePlaylist = () => {
    setSelectedPlaylist(null);
    setPlaylistVideos([]);
  };

  const currentVideo = playlistVideos[currentIndex];
  const currentVideoTitle = currentVideo?.snippet?.title;

  return (
    <div className="life-lessons-container">
      <Helmet>
        <title>{currentVideoTitle ? `${currentVideoTitle} | MindWork360` : 'Life Lessons | Personal Growth & Well-Being | MindWork360'}</title>
        <meta name="description" content={currentVideoTitle ? `Watch "${currentVideoTitle}" on MindWork360 — life lessons for personal growth and mental well-being.` : 'Explore inspiring life lessons, practical insights, and expert guidance from MindWork360 to build resilience, improve emotional well-being, and grow with confidence.'} />
        <link rel="canonical" href="https://mindwork360.com/lifelessons" />
      </Helmet>
      <h1 className="seo-only">Life Lessons | Personal Growth & Well-Being | MindWork360</h1>
      <h2 className="seo-only">Inspiring Life Lessons for Mental Health & Personal Growth</h2>
      <h3 className="life_heading_h3">Life Lessons</h3>
      <div className="lessons-hero-banner">
        <img src={banner} alt="Life Lessons Banner" title="Life Lessons — MindWork360" className="lessons-hero-bg" />
        <div className="lessons-hero-overlay"></div>
      </div>

      <div className="tab-buttons_l" ref={playerRef}>
        {/* Single "Videos" section; clicking it also returns to the playlist list */}
        <button className="active-tab" onClick={closePlaylist}>
          Videos
        </button>
      </div>

      {selectedPlaylist ? (
        <div className="playlist-view_l">
          <button className="back-to-playlists_l" onClick={closePlaylist}>
            ← All playlists
          </button>

          {loadingVideos ? (
            <div className="loading-state_l">Loading videos...</div>
          ) : playlistVideos.length === 0 ? (
            <p className="empty-state_l">No videos available in this playlist.</p>
          ) : (
            <div className="playlist-layout_l">
              <div className="playlist-player_l">
                <div className="modal-player-wrapper_l">
                  <iframe
                    key={currentVideo.id}
                    title={currentVideoTitle || "YouTube Video Player"}
                    src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h4 className="now-playing-title_l">{currentVideoTitle}</h4>
                <div className="video-meta_l now-playing-meta_l">
                  <span>{parseInt(currentVideo.statistics?.viewCount || 0).toLocaleString()} Views</span>
                  <span>{new Date(currentVideo.snippet.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <aside className="playlist-sidebar_l">
                <div className="playlist-sidebar-header_l">
                  <div className="playlist-sidebar-title_l">{selectedPlaylist.snippet.title}</div>
                  <div className="playlist-sidebar-count_l">
                    {currentIndex + 1} / {playlistVideos.length}
                  </div>
                </div>
                <ol className="playlist-items_l">
                  {playlistVideos.map((video, index) => (
                    <li
                      key={video.id}
                      className={`playlist-item_l ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <span className="playlist-item-index_l">
                        {index === currentIndex ? '▶' : index + 1}
                      </span>
                      <div className="playlist-item-thumb_l">
                        <img src={video.snippet.thumbnails?.medium?.url} alt={video.snippet.title} title={video.snippet.title} />
                        <span className="video-duration_l">{formatDuration(video.contentDetails?.duration)}</span>
                      </div>
                      <div className="playlist-item-title_l">{video.snippet.title}</div>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          )}
        </div>
      ) : loading ? (
        <div className="loading-state_l">Loading playlists...</div>
      ) : (
        <div className="video-grid_l">
          {playlists.length === 0 && (
            <p className="empty-state_l" style={{ gridColumn: "1 / -1" }}>
              No videos available.
            </p>
          )}
          {playlists.map(playlist => (
            <div key={playlist.id} className="video-card_l" onClick={() => openPlaylist(playlist)}>
              <div className="thumbnail-wrapper_l">
                <img src={thumbnailUrl(playlist.snippet)} alt={playlist.snippet.title} title={playlist.snippet.title} />
                <span className="playlist-count_l">▶ {playlist.contentDetails.itemCount} videos</span>
              </div>
              <div className="video-title_l">{playlist.snippet.title}</div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LifeLessons;
