import PagesLayout from "./(pages)/layout";
import Home from "./(pages)/home/page";
import Dashboard from "./(pages)/dashboard/page";


export default function Main() {

  const loginStatus = false                      

  return !loginStatus && (
    <PagesLayout>
      {loginStatus ? <Dashboard /> : <Home />}
    </PagesLayout>
  );
}