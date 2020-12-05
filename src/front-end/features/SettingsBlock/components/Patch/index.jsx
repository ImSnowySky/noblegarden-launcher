import React from 'react';
import * as Elements from './elements';

const Patch = ({ name, path, description, watchedCustomPatches, watchPatch, unwatchPatch }) => {
  const isWatched = React.useMemo(() => watchedCustomPatches.some(name => name === path), [path, watchedCustomPatches]);
  const clickHandler = React.useCallback(() => {
    isWatched ? unwatchPatch(path) : watchPatch(path)
  }, [isWatched, watchPatch, unwatchPatch]);

  return (
    <Elements.Container>
      <Elements.Name>{name}</Elements.Name>
      <Elements.Description>{description}</Elements.Description>
      <Elements.SelectorContainer>
        <Elements.Selector selected = {isWatched} onClick = {clickHandler} />
      </Elements.SelectorContainer>
    </Elements.Container>
  );
}

export default Patch;