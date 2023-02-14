import React, { useState } from "react";
import { Row, Col, Button, Collapse, Table } from "react-bootstrap";
import { convertType, changeEventTime } from "helpers/helpers";

export default function Timeline({ matchInfo }) {
	const [isOpen, setIsOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Row className="justify-content-center">
			<div className="d-flex">
				<Button
					className="animate__animated animate__fadeIn mx-auto mb-3"
					onClick={() => setIsOpen(!isOpen)}
					aria-controls="collapse-table"
					aria-expanded={isOpen}
					variant="outline-primary"
					active={isOpen}>
					Click to {collapsed ? "open" : "close"} timeline table
				</Button>
			</div>
			<Col lg={8}>
				<Collapse
					in={isOpen}
					onExited={() => {
						setCollapsed(true);
					}}
					onEnter={() => {
						setCollapsed(false);
					}}>
					<div id="collapse-table">
						<Table className="mx-auto table text-center" size="sm">
							<thead className="bg-primary-subtle">
								<tr>
									<th>event type</th>
									<th>time</th>
								</tr>
							</thead>
							<tbody>
								{matchInfo?.timeline.map((matchEvent) => (
									<tr className="center" key={matchEvent.id}>
										<td className="sm:w-50">
											{convertType(matchEvent.type)}
										</td>
										<td>
											{changeEventTime(matchEvent.time)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Collapse>
			</Col>
		</Row>
	);
}
