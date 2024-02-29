import { useHistory } from "react-router-dom";


const LimitReached = ({setShowLimitModal}) => {

  const history = useHistory();

  const handleNavigatePlans = (e) => {
    e.preventDefault()
    history.push('/choose-plan');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[600px] h-[500px] rounded p-8">
        <p className="text-4xl font-bold mb-5">Your network has grown!</p>
        <p className="mb-5">You've met your plan's limit on the number of contact cards you can have. Upgrade to the premium plan to continue growing  your network.</p>
        <div className="flex flex-col items-center justify-center bg-pale-green w-3/4 rounded p-4">
          <div className="flex flex-col items-center justify-center bg-white drop-shadow w-2/3 rounded p-2 mb-3">
            <p className="text-xl font-semibold">Premium</p>
            <p>$10/month</p>
          </div>
          <div className="flex flex-col items-start justify-center bg-white drop-shadow w-full rounded p-2 mb-5">
            <p><span className="font-semibold">Unlimited </span>network contact cards</p>
            <p>Chrome extension</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <button onClick={e => setShowLimitModal(false)} className="button-white">
              Maintain 10 contacts
            </button>
            <button onClick={handleNavigatePlans} className="button">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default LimitReached;