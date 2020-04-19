import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NotFoundImg from '../Static/404.png';

const NotFound = ({ history }) => {
	const MySwal = withReactContent(Swal);
	let timerInterval;
	MySwal.fire({
		title: 'Oops...Page not found!',
		text: 'Something went wrong!',
		html: 'You will be redirected to Home page in <strong></strong> seconds.',
		imageUrl: NotFoundImg,
		heightAuto: true,
		showClass: 'zoomIn',
		hideClass: 'zoomOut',
		width: 800,
		imageWidth: 800,
		imageHeight: 400,
		imageAlt: '404 image',
		timer: 7000,
		onBeforeOpen: () => {
			Swal.showLoading();
			timerInterval = setInterval(() => {
				Swal.getContent().querySelector('strong').textContent = (
					Swal.getTimerLeft() / 1000
				).toFixed(0);
			}, 100);
		},
		onClose: () => {
			clearInterval(timerInterval);
			history.push('/');
		},
	});
	return null;
};

export default NotFound;
