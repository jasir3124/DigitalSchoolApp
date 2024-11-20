import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TravelContext } from "../context/TravelContext";



function EditTravel(){
  const {travels, setTravels} = useContext(TravelContext);
  const [currentTravel, setCurrentTravel] = useState();
  const { destination } = useParams();

  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    const currTravel = travels.filter(t => t.destination === destination)[0];
    setCurrentTravel(currTravel);
  }, [destination]);

  const saveChanges = () => {
    const obj = {
      destination: dest,
      date: date,
      group: group
    };

    const updatedValues = travels.map(travel => 
      travel.destination === destination ? obj : travel);
    
    setTravels(updatedValues);
  }
  return(
    <>
      <input type="text" 
        value={dest || currentTravel?.destination} 
        placeholder="Destination"
        onChange={(e) => setDest(e.target.value)} />
      <input type="date"
        value={date || currentTravel?.date}
        placeholder="Date"
        onChange={(e) => setDate(e.target.value)} />
      <input 
        type="text" 
        placeholder="Group"
        value={group || currentTravel?.group} 
        onChange={(e) => setGroup(e.target.value)} />
      <button onClick={saveChanges}>
        <Link to="/travelList">Save</Link> 
      </button>
    </>
  )
}

export default EditTravel;