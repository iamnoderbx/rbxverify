import { Link } from "@remix-run/react"
import ProfilePictureButton from "./profile/login.tsx";

const Header = (props: { user : any }) => {
    let user = props.user;

    return (
      <div className="navbar bg-transparent absolute z-20">
        <div className="flex-1">
          
        </div>
        <div className="flex-none gap-2">
          <a className="inline-flex cursor-pointer justify-center text-center align-middle h-12 min-h-12">
            <Link to="/">
              <button className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </button>
            </Link>
          </a>
          <ProfilePictureButton user={user}/>
        </div>
      </div>
    )
}

export default Header