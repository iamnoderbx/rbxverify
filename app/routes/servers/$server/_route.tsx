import { useOutletContext } from "@remix-run/react";
import { useParams } from 'react-router-dom';
import { DisplayError } from "~/components/error.tsx";

export default function Index() {
    const [ guilds ] : any = useOutletContext();
    
    const params = useParams();
    const server = params.server

    const guild = guilds.find((x : any) => x.guild.id === server)
    if(!guild) return <DisplayError error = {
        {status: 405, body: "This server either does not exist, or you do not have access to it!", hideHeader: true, hideSupport: true}
    }/>

    return <div className="w-10/12 m-10 items-center ml-28">
        <div className="flex gap-6">
            <div className="flex w-auto align-middle text-center items-center ...">
                <h1 className="text-6xl font-bold [text-shadow:_3px_5px_15px_rgb(0_0_0_/_90%)]">QuickVerify</h1>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className="flex gap-6">
            <div className="stats shadow-md">
                <div className="stat bg-[#141414]">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">25.6K</div>
                </div>
                

                <div className="stat bg-[#141414]">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Total Verifications</div>
                    <div className="stat-value text-secondary">2.6M</div>
                </div>
            </div>
            <div className="alert shadow-lg max-w-md bg-[#141414]">
                <div className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 text-primary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold">Notice!</h3>
                    <div className="text-xs">This is currently an experimental beta, please report any bugs to our discord!</div>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className="card w-full bg-[#141414] shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Current Bindings</h2>
                <p>Edit and modify your bindings accordingly.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary absolute top-10">+</button>
                </div>
                <br></br>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Binding Type</th>
                                <th>Binding Name</th>
                                <th className="justify-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>ROBLOX Group</td>
                            <td>Attack on Titan: Scarlet</td>
                            <th className="flex items-end">
                                <button className="btn btn-primary btn-s">Modify</button>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
};