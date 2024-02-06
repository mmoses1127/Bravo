const TimelineUnit = ({eventInfo}) => {

  const prettyDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }

  return (
    <div className="border-solid border-green-900 border-l-2 pl-3 pb-3">
      <p>{eventInfo.title}</p>
      <p>{prettyDate(eventInfo.date)}</p>
    </div>
  )

}

export default TimelineUnit;