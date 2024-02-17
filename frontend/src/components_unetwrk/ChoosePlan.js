import PlanColumn from "./PlanColumn";
import SignupHeader from "./SignupHeader";

const ChoosePlan = () => {

return (

  <div className="flex flex-col h-screen">
    <SignupHeader />
    <div className="flex flex-col items-center justify-center h-1/2">
      <p className="text-3xl text-text-primary font-semibold mb-3">Maintain your network effectively</p>
      <p className="text-xl text-text-primary font-semibold mb-5">Select your plan.</p>
      <div className="flex flex-row w-1/2 justify-evenly">
        <PlanColumn plan={{name: 'Free', price: 0, cards: 10}} />
        <PlanColumn plan={{name: 'Premium', price: 10, cards: 'Unlimited'}} />
      </div>
    </div>
  </div>

)

}

export default ChoosePlan;