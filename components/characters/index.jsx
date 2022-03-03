import React from 'react';
import Paginations from '../paginations/index.jsx';

const Character = props => {
	const { character, info } = props.character;

	function statusCharacter(status){
		switch (status) {
			case 'Alive':
				return <span className="circulStatus alive" />;
				break;
			case 'Dead':
				return <span className="circulStatus dead" />;
				break;
			case 'unknown':
				return <span className="circulStatus unknown" />;
				break;
		}
	}

	return (
		<React.Fragment>
			{character != undefined ? (
				<React.Fragment>
					<div className="characters">
						{character.map((character, index) => (
							<div className="character" key={index} id={index}>
								<div className="image">
									<img src={character.image} alt={character.name} />
								</div>
								<div className="info">
									<h2>{character.name}</h2>
									<p className="status">
										{statusCharacter(character.status)}
										{character.status} -
										{character.species}
									</p>
									<p className="origin">
										Origin:
										<span> {character.origin.name}</span>
									</p>
								</div>
							</div>
						))}
					</div>
					{info.pages > 1 ? (
						<Paginations
							nextPage={props.nextPage}
							prevPage={props.prevPage}
							page={props.page}
						/>
					) : null}
				</React.Fragment>
			) : (
				<React.Fragment>
					<article className="articleNull">
						<h2>No hay personajes</h2>
					</article>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Character;
