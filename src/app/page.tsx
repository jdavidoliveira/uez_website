import PagesLayout from "./(pages)/layout";
import Home from "./(pages)/home/page";

export default function Main() {

  const loginStatus = false                      

  return !loginStatus && (
    <PagesLayout>
      <Home />
    </PagesLayout>
  );
}