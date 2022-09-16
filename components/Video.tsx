import React from "react";
import ReactPlayer from "react-player";
import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
const Video = ({ trailer }: { trailer: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLight, setIsLight] = useState(false);
  return (
    <>
      <ReactPlayer
        className="absolute top-0 left-0"
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={isMuted}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        onClickPreview={() => setIsLight(true)}
      />
      <div className="absolute rounded-md bg-transparent bottom-2 left-2 right-2 z-10 text-white flex  justify-between w-[97%]">
        <button
          className="flex bg-white  text-black p-2 rounded-sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <span>
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </span>
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <button
          className="bg-white text-black p-2 rounded-sm"
          onClick={() => setIsMuted(!isMuted)}
        >
          <span>
            {isMuted ? (
              <SpeakerXMarkIcon className="h-6 w-6" />
            ) : (
              <SpeakerWaveIcon className="h-6 w-6" />
            )}
          </span>
        </button>
      </div>
    </>
  );
};

export default Video;
