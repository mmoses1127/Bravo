import emblem from '../assets/linkedin_logo.png';


const WelcomePane = () => {

  return (

    <div className="flex flex-col items-center justify-center w-1/2 bg-[#004D40]">
      <div className="flex flex-col justify-center items-center w-1/2 h-1/2">
        <img className="h-full" src={emblem} alt="Unetwrk Logo" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-white">You network?</h2> 
        <h2 className="text-white">You should!</h2>
        <p className="text-white">Start growing and maintaining your network.</p>
      </div>
    </div>
    
  )

}

export default WelcomePane;