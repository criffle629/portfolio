import YouTube from "react-youtube";

const YoutubePlayer = (props) => {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 1
    }
  };

  return (
    <YouTube style={props.style} videoId={props.video} opts={videoOptions} />
  );
}

export default YoutubePlayer;