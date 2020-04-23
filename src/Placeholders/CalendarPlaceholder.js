import React from 'react';
import ContentLoader from 'react-content-loader';

const CalendarPlaceholder = () => (
	<ContentLoader
		speed={2}
		width={750}
		height={612}
		viewBox='0 0 750 612'
		backgroundColor='#bbbbbb'
		foregroundColor='#ecebeb'
	>
		{/* header buttons group 1 */}
		<rect x='0' y='0' rx='3' ry='3' width='288' height='35' />
		{/* header title */}
		<rect x='333' y='0' rx='3' ry='3' width='119' height='35' />
		{/* header buttons group 2 */}
		<rect x='499' y='0' rx='3' ry='3' width='251' height='35' />
		<rect x='8' y='98' rx='0' ry='0' width='0' height='1' />
		{/* calendar days header */}
		<rect x='0' y='56' rx='0' ry='0' width='773' height='20' />
		{/* calendar days squares first line */}
		<rect x='0' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='77' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='77' rx='0' ry='0' width='108' height='88' />
		{/* calendar days squares second line */}
		<rect x='0' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='166' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='166' rx='0' ry='0' width='108' height='88' />
		{/* calendar days squares third line */}
		<rect x='0' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='255' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='255' rx='0' ry='0' width='108' height='88' />
		{/* calendar days squares fourth line */}
		<rect x='0' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='344' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='344' rx='0' ry='0' width='108' height='88' />
		{/* calendar days squares fifth line */}
		<rect x='0' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='433' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='433' rx='0' ry='0' width='108' height='88' />
		{/*calendar days squares fifth line */}
		<rect x='0' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='107' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='214' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='321' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='428' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='535' y='522' rx='0' ry='0' width='106' height='88' />
		<rect x='642' y='522' rx='0' ry='0' width='108' height='88' />
		{/* skeleton original */}
		{/* <rect x='0' y='0' rx='3' ry='3' width='773' height='35' />
		<rect x='8' y='98' rx='0' ry='0' width='0' height='1' />
		<rect x='0' y='56' rx='0' ry='0' width='773' height='556' /> */}
	</ContentLoader>
);

export default CalendarPlaceholder;
