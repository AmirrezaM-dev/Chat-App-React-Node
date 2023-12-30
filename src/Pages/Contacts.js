import {
	faArrowLeft,
	faEllipsisVertical,
	faMessage,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
const Contacts = () => {
	return (
		<div className="friends px-0 py-2 p-xl-3 d-block">
			<div className="container-xl">
				<div className="row">
					<div className="col">
						<div className="card card-body card-bg-1 mb-3">
							<div className="d-flex flex-column align-items-center">
								<div className="avatar avatar-lg mb-3">
									<img
										className="avatar-img"
										src={require("../assets/media/avatar/3.png")}
										alt=""
									/>
								</div>
								<div className="d-flex flex-column align-items-center">
									<h5 className="mb-1">
										Catherine Richardson
									</h5>
									{/* <p class="text-white rounded px-2 bg-primary">+01-202-265462</p> */}
									<div className="d-flex mt-2">
										<Button className="btn-icon rounded-circle text-light mx-2">
											<FontAwesomeIcon icon={faMessage} />
										</Button>
									</div>
								</div>
							</div>
							<div className="card-options">
								<Dropdown>
									<Dropdown.Toggle
										as={Button}
										size="sm"
										variant="secondary"
										className="btn-icon btn-minimal text-muted border-0"
									>
										<FontAwesomeIcon
											icon={faEllipsisVertical}
										/>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item>Remove</Dropdown.Item>
										<Dropdown.Item>Block</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="chat-closer d-xl-none">
								{/* Chat Back Button (Visible only in Small Devices) */}
								<Button
									variant="secondary"
									size="sm"
									className="btn-icon btn-minimal text-muted border-0"
								>
									<FontAwesomeIcon icon={faArrowLeft} />
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="row friends-info">
					<div className="col">
						<div className="card">
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Local Time
											</p>
											<p className="mb-0">10:25 PM</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/clock.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Birthdate
											</p>
											<p className="mb-0">20/11/1992</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/calendar.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Phone
											</p>
											<p className="mb-0">
												+01-222-364522
											</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/phone.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Email
											</p>
											<p className="mb-0">
												catherine.richardson@gmail.com
											</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/mail.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Website
											</p>
											<p className="mb-0">
												www.catherichardson.com
											</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/globe.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Address
											</p>
											<p className="mb-0">
												1134 Ridder Park Road, San
												Fransisco, CA 94851
											</p>
										</div>
										<svg
											className="text-muted hw-20"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/heroicons/outline/home.svg" alt=""> */}
									</div>
								</li>
							</ul>
						</div>
						<div className="card">
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Facebook
											</p>
											<Link className="font-size-sm font-weight-medium">
												@cathe.richardson
											</Link>
										</div>
										<svg
											className="text-muted hw-20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/icons/facebook.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Twitter
											</p>
											<Link className="font-size-sm font-weight-medium">
												@cathe.richardson
											</Link>
										</div>
										<svg
											className="text-muted hw-20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/icons/twitter.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Instagram
											</p>
											<Link className="font-size-sm font-weight-medium">
												@cathe.richardson
											</Link>
										</div>
										<svg
											className="text-muted hw-20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<rect
												x={2}
												y={2}
												width={20}
												height={20}
												rx={5}
												ry={5}
											/>
											<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
											<line
												x1="17.5"
												y1="6.5"
												x2="17.51"
												y2="6.5"
											/>
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/icons/instagram.svg" alt=""> */}
									</div>
								</li>
								<li className="list-group-item">
									<div className="media align-items-center">
										<div className="media-body">
											<p className="small text-muted mb-0">
												Linkedin
											</p>
											<Link className="font-size-sm font-weight-medium">
												@cathe.richardson
											</Link>
										</div>
										<svg
											className="text-muted hw-20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
											<rect
												x={2}
												y={9}
												width={4}
												height={12}
											/>
											<circle cx={4} cy={4} r={2} />
										</svg>
										{/* <img class="injectable text-muted hw-20" src="./../../assets/media/icons/linkedin.svg" alt=""> */}
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contacts
