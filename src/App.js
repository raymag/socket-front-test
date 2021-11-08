import "./App.css";
import { io } from "socket.io-client";
import { useState, useEffect, useRef, useCallback } from "react";

function App() {
	const [msg, setMsg] = useState("");
	const [id, setId] = useState("");
	const [treatmentId, setTreatmentId] = useState("");
	const [socket, setSocket] = useState({});

	const socketRef = useRef(socket);

	const emitJoinTreatmentRoom = useCallback(() => {
		console.log("emited join treatment room");
		socketRef.current.emit("join-treatment-room", { id, role: "vet" });
	}, [id]);

	const emitCall = useCallback(() => {
		console.log("emited call");
		socketRef.current.emit("call", { treatmentId });
	}, [treatmentId]);

	useEffect(() => {
		console.log("new conn");
		const skt = io("http://localhost:3000", { path: "/ws" });
		setSocket(skt);
		socketRef.current = skt;
	}, []);

	return (
		<div className='App'>
			<div className='input-group'>
				<span>Vet id:</span>
				<input
					type='text'
					value={id}
					onChange={(e) => setId(e.target.value)}
					id='vet-id'
				/>
			</div>
			<div className='input-group'>
				<span>Treatment on Going id:</span>
				<input
					type='text'
					value={treatmentId}
					onChange={(e) => setTreatmentId(e.target.value)}
					id='treatment-id'
				/>
			</div>
			<fieldset>
				<legend>Emit Events</legend>
				<button onClick={emitJoinTreatmentRoom}>Join Treatment Room</button>
				<button onClick={emitCall}>Call</button>
				<button>Finish Treatment</button>
			</fieldset>
			<div>
				<span>Status: {msg}</span>
			</div>
		</div>
	);
}

export default App;
