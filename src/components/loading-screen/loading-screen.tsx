type LoadingScreenProps = {
  textLoading: string;
}


function LoadingScreen({textLoading}  : LoadingScreenProps): JSX.Element {
  return (
    <p style={{marginTop: 200, fontSize: 30}}>{textLoading}</p>
  );
}

export default LoadingScreen;
