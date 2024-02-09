import { Form, Link } from "@remix-run/react";

const ProfileLoginButton = () => {
    return (
        <a>
            <Link to="/login">
                <div className="tooltip tooltip-bottom" data-tip="Login">
                <button className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </button>
                </div>
            </Link>
        </a>
    )
};

const ProfilePictureButton = (props: { user : any }) => {
    const user = props.user
    if(!user || !user.profile) return ProfileLoginButton();

    const profile = user.profile
    const url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=256`
    
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img src={url} />
            </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                <li>
                    <a href="../servers" className="justify-between">
                        Manage Servers
                    <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Accounts</a></li>
                <li>
                    <Form action="/logout" method="post" className="h-full w-full min-w-full">
                        <button type="submit" className="min-w-full min-h-full w-full h-full absolute" />
                        Logout
                    </Form>
                </li>
            </ul>
        </div>
    )
}

export default ProfilePictureButton