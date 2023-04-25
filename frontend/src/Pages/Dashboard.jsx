import Navbar from './../Components/Navbar'
function Dashboard({userId}) {

  console.log(userId);

  return (
    <div>
      <Navbar/>
      <p> This is your userid {userId}</p>
    </div>
  )
}
export default Dashboard;