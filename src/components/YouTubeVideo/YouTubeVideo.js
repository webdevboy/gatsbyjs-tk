import React from 'react';

import './YouTubeVideo.scss';

export default function YouTubeVideo({
    headline,
    subHeadline,
    youtubeVideoId,
    backgroundColor
}) {
    return (
        <section className='yt-video-section' style={{ backgroundColor: backgroundColor }}>
            <h4 className="video-headline">{headline}</h4>
            <h5 className="video-subhead">{subHeadline}</h5>
            <div className="video-wrapper">
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    frameBorder="0"
                />
            </div>
        </section>
    );
}