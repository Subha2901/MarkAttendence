import React from "react";
import './Attendence_list.sass'

export default function attendence_list() {
  return (
    <div className="container">
      <ol className="style_1" style={{textAlign: 'left', fontSize: '14px', fontWeight: '100', color: '#fff2f285'}}>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3<br/>
			<small>
				Note: Some tost to expand verticle height<br/>
				and some more lines
			</small>
		</li>
		<li>Item 5
			<ol>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</ol>
		</li>
		<li>More Item 6</li>
		<li>More Item 7</li>
	</ol>
    </div>
  );
}
