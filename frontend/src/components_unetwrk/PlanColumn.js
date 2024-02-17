const PlanColumn = ({ plan }) => {

  return (

    <div className="flex flex-col items-center justify-center bg-pale-green rounded p-3 w-1/4">
      <div className="drop-shadow bg-white rounded p-3 w-full flex flex-col items-center justify-center mb-3">
        <p className="text-xl mb-2 font-semibold">{plan.name}</p>
        <p>${plan.price}/month</p>
      </div>
      <div className="drop-shadow bg-white rounded p-3 w-full flex flex-col items-center justify-center mb-3">
        <p>{plan.cards} contact cards</p>
        <p>Chrome extension</p>
      </div>
      <button className="bg-brand-primary rounded p-2 text-white w-full">Choose {plan.name} plan</button>
    </div>

  )

}

export default PlanColumn;