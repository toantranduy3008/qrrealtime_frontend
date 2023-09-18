import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/Auth.service";

import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Profile from "./components/Profile.component";

import PrivateRoute from "./utils/PrivateRoute";
import {
	Nav, NavItem, Navbar, NavLink,
	UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import ServiceAlert from "./common/ServiceAlert";

import FooterComponent from "./components/Footer.component";
import TransactionReport from "./components/reports/TransactionReport.component";
import DailyReport from "./components/reports/DailyReport.component";
const arrAdminRoles = ["ROOT", "ADMIN"];
const arrTechAdminRoles = ["ROOT", "ADMIN", "SENIOR_OPERATOR"];
const arrBusinessRptRoles = ["ROOT", "ADMIN", "SENIOR_OPERATOR", "KIEM_SOAT", "TRA_SOAT", "SENIOR_BUSINESS"];
const arrPaymentsHistoryRoles = [
	"ROOT",
	"ADMIN",
	"SENIOR_OPERATOR",
	"KIEM_SOAT",
	"SENIOR_BUSINESS",
	"OPERATOR",
	"TRA_SOAT"];

class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.handleAction = this.handleAction.bind(this);
		this.handleSleep = this.handleSleep.bind(this);
		this.addEventListener = this.addEventListener.bind(this);
		this.removeEventListener = this.removeEventListener.bind(this);

		this.state = {
			showAdminBoard: false,
			showTechAdminBoard: false,
			showBusinessRptBoard: false,
			showPaymentsHistoryBoard: false,
			currentUser: undefined,
			alertTimeout: undefined,
			logOutTimeout: undefined,
			lastActiveTime: undefined,
		};
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showAdminBoard: user.roles.some(r => arrAdminRoles.indexOf(r) >= 0),
				showTechAdminBoard: user.roles.some(r => arrTechAdminRoles.indexOf(r) >= 0),
				showBusinessRptBoard: user.roles.some(r => arrBusinessRptRoles.indexOf(r) >= 0),
				showPaymentsHistoryBoard: user.roles.some(r => arrPaymentsHistoryRoles.indexOf(r) >= 0)
			});
		}

		EventBus.on("logout", () => {
			this.logOut();
		});
		this.addEventListener();
	}

	componentWillUnmount() {
		this.removeEventListener();
		EventBus.remove("logout");
	}

	removeEventListener() {
		if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
			return;
		}
		document.removeEventListener("scroll", this.handleAction);
		document.removeEventListener("click", this.handleAction);
		document.removeEventListener("contextmenu", this.handleAction);
		document.removeEventListener("keydown", this.handleAction);
	}

	addEventListener() {
		if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
			return;
		}
		document.addEventListener("scroll", this.handleAction);
		document.addEventListener("click", this.handleAction);
		document.addEventListener("contextmenu", this.handleAction);
		document.addEventListener("keydown", this.handleAction);
	}

	handleSleep() {
		let currentTime = (new Date()).getTime();
		this.setState({
			lastActiveTime: currentTime
		})
		setInterval(function () {
			let newCurrentTime = (new Date()).getTime();
			if (newCurrentTime > (this.state.lastActiveTime + 2000 * 2)) {  // ignore small delays
				ServiceAlert.success("Thông báo", "Đăng xuất.");
				this.logOut();
			}
			this.setState({
				lastActiveTime: newCurrentTime
			})
		}.bind(this),
			2000);
	}

	handleAction(event) {
		if (this.state.alertTimeout) clearTimeout(this.state.alertTimeout);
		if (this.state.logOutTimeout) clearTimeout(this.state.logOutTimeout);
		let alertTimeout = setTimeout(
			function () {
				ServiceAlert.success("Thông báo", "Không ghi nhận hoạt động");
			},
			10 * 60 * 1000
		);
		let logOutTimeout = setTimeout(
			function () {
				ServiceAlert.success("Thông báo", "Đăng xuất");
				this.logOut();
			}.bind(this),
			15 * 60 * 1000
		);
		this.setState({
			alertTimeout: alertTimeout,
			logOutTimeout: logOutTimeout,
		});
	}

	logOut() {
		AuthService.logout();
		this.setState({
			showAdminBoard: false,
			showBusinessRptBoard: false,
			showPaymentsHistoryBoard: false,
			showTechAdminBoard: false,
			currentUser: undefined,
		});
	}

	render() {
		const { currentUser, showTechAdminBoard } = this.state;

		return (
			<div>
				<Navbar expand="md">
					<div>
						<Link to={"/reports/transactionReport"} className="navbar-brand">
							<img src='/images/napas.svg' alt="Napas" style={{ width: "100%", maxWidth: "100px" }} />
						</Link>
					</div>

					<Nav className="mr-auto" navbar>
						{/* {showTechAdminBoard && (
							<>
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Lịch sử
									</DropdownToggle>
									<DropdownMenu className="bg-dark">
										<DropdownItem className="bg-dark">
											<Link to={"/admin/history/HisApiAccess"} className="nav-link">
												Lịch sử tương tác API
											</Link>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</>
						)} */}

						{currentUser && (
							<>
								{/* Tra cứu */}
								{/* <UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Tra cứu
									</DropdownToggle>
									<DropdownMenu className="bg-dark">
										<DropdownItem className="bg-dark">
											<Link to={"/admin/detail/TblPayment"} className="nav-link">
												Tra cứu giao dịch do TCNL trả về
											</Link>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown> */}

								{/* Báo cáo */}
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Báo cáo
									</DropdownToggle>
									<DropdownMenu className="bg-dark">
										<DropdownItem className="bg-dark">
											<Link to={"/reports/transactions"} className="nav-link">
												Tìm kiếm giao dịch
											</Link>
										</DropdownItem>
										<DropdownItem className="bg-dark">
											<Link to={"/reports/daily-report"} className="nav-link">
												Báo cáo hàng ngày
											</Link>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</>
						)}
					</Nav>

					{currentUser ? (
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									{currentUser.username}
								</DropdownToggle>
								<DropdownMenu className="bg-dark dropdown-menu-right">
									<DropdownItem className="bg-dark">
										<Link to={"/admin/profile"} className="nav-link">
											Tài khoản
										</Link>
									</DropdownItem>
									<DropdownItem className="bg-dark">
										<NavLink onClick={this.logOut}>
											Logout
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>


						</Nav>
					) : (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Link to={"/login"} className="nav-link">
									Login
								</Link>
							</NavItem>
						</Nav>
					)}
				</Navbar>

				{/* <Container fluid className="mt-4"> */}
				<Switch>
					<PrivateRoute exact path={["/", "/home"]} component={Home} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/admin/profile" component={Profile} />


					<PrivateRoute path="/reports/transactions"
						component={TransactionReport}
						pageTitle="Tìm kiếm giao dịch"
					/>
					<PrivateRoute path="/reports/daily-report"
						component={DailyReport}
						pageTitle="Báo cáo hàng ngày"
					/>

				</Switch>
				{/* </Container> */}
				<AuthVerify logOut={this.logOut} />

				<FooterComponent></FooterComponent>
			</div>
		);
	}
}

export default App;
