import { useEffect } from 'react';
import { useKeyboardLayout } from '../hooks';
import { IKeyboardLayoutProps, IQwertyKeyboardHookProps } from '../models';
import { QwertyKeyboard, NumpadKeyboard, NumericKeyboard, FlexBox } from '../components';

function KeyboardLayout(props: IKeyboardLayoutProps) {
  const { 
    currentLayout, 
    selectedLanguage, 
    isShiftActive, 
    isSymbolActive, 
    input, 
    setInput, 
    onShift, 
    onSymbol, 
    onLanguageChange,
    onSpace, 
    onClean, 
    onDelete 
  } = useKeyboardLayout();
  const { mode, styles, actionProps, inputMaxLength, onKeyPress } = props;
  
  useEffect(() => {
    onKeyPress && onKeyPress(input);
  }, [input]);

  const qwertyKeyboardHookProps: IQwertyKeyboardHookProps = {
    currentLayout,
    selectedLanguage,
    isShiftActive,
    isSymbolActive,
    setInput,
    onShift,
    onSymbol,
    onLanguageChange,
    onSpace,
    onClean,
    onDelete 
  }
  
  return (
    <FlexBox alignItems='flex-start' columnGap={20}>
      {mode === 'qwerty' || mode === 'qwerty-numpad' ? (
        <QwertyKeyboard 
          actionProps={actionProps}
          input={input}
          inputMaxLength={inputMaxLength}
          hookProps={qwertyKeyboardHookProps}
          styles={styles}
        />
      ) : null}
      {mode === 'qwerty-numpad' && (
        <NumpadKeyboard 
          styles={styles}
          input={input}
          inputMaxLength={inputMaxLength}
          setInput={setInput}
        />
      )}
      {mode === 'numeric' || mode === 'numeric-dot' ? (
        <NumericKeyboard 
          styles={styles}
          actionProps={actionProps}
          input={input}
          inputMaxLength={inputMaxLength}
          isNumericMode={mode === 'numeric'}
          selectedLanguage={selectedLanguage}
          setInput={setInput}
          onDelete={onDelete}
        />
      ) : null}
    </FlexBox>
  )
}

export default KeyboardLayout;
