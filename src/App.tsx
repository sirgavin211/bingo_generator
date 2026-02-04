import './App.css'
import { useState } from 'react';
import Cell from "./components/Cell/Cell.tsx";




interface Settings {
  border_thickness: number,
  border_color: string,
  text_color: string,
  heading: string,
  background_color: string,
  cell_color: string
}






function App() {

  const [board, updateBoard] = useState<string[][]>();
  const [words, updateWords] = useState<string>();
  const [separator, updateSeparator] = useState<string>(",");
  const [settings, updateSettings] = useState<Settings>({
    border_thickness: 1,
    border_color: "#B1B1C7",
    text_color: "#3E4049",
    heading: "BINGO",
    background_color: "#E5E5F2",
    cell_color: "#E5E5F2",
  })


  function generateBoard(): void {
    if (!words) {
      alert("Put some words into the freaking text box!!! D:(");
      return;
    }

    const data: string[] = words.split(separator);
    let scramble: string[] = [];

    console.log(data.length);


    while (scramble.length < 26) {
      const random_index: number = getRandomIndex(data.length);
      scramble = [...scramble, data[random_index]];
      data.splice(random_index, 1);
    }


    const result: string[][] = [];

    for (let i = 0; i <= scramble.length; i += 5) {
      result.push(scramble.slice(i, i + 5));

    }

    result[2][2] = "FREE"
    result.splice(5, 1);


    updateBoard(result);

  }


  function getRandomIndex(index: number): number {
    return Math.floor(Math.random() * index);
  }

  return (
    <>
      <div className='app'>
        <div className='control_panel'>

          <h1>Control Panel</h1>

          <div className='input_panel'>

            <textarea placeholder="Put at least 25 words into the box, seperated by the character or string set to the right of me." onChange={(e) => {
              updateWords(e.target.value);
            }} />

            <div className='settings'>

              <input
                type="text"
                placeholder="Seperator"
                onChange={(e) => {
                  updateSeparator(e.target.value);
                }}
              />

              <input
                type="number"
                placeholder="Border Thickness (px)"
                onChange={(e) => {
                  updateSettings(prev => ({
                    ...prev,
                    border_thickness: Number(e.target.value)
                  }))
                }}
              />

              <div className='color_input'>
                <strong>Border Color: </strong>
                <input
                  type="color"
                  placeholder="Border Color"
                  onChange={(e) => {
                    updateSettings(prev => ({
                      ...prev,
                      border_color: e.target.value
                    }))
                  }}
                />
              </div>


              <div className='color_input'>
                <strong>Text Color: </strong>
                <input
                  type="color"
                  placeholder="Text Color (px)"
                  onChange={(e) => {
                    updateSettings(prev => ({
                      ...prev,
                      text_color: e.target.value
                    }))
                  }}
                />
              </div>

              <input
                type="text"
                placeholder="Heading"
                onChange={(e) => {
                  updateSettings(prev => ({
                    ...prev,
                    heading: e.target.value
                  }))
                }}
              />

              <div className='color_input'>
                <strong>Background Color: </strong>
                <input
                  type="color"
                  placeholder="Background Color"
                  value={settings.background_color}
                  onChange={(e) => {
                    updateSettings(prev => ({
                      ...prev,
                      background_color: e.target.value
                    }))
                  }}
                />
              </div>


              <div className='color_input'>
                <strong>Cell Color: </strong>
                <input
                  type="color"
                  placeholder="Cell Color"
                  value={settings.cell_color}
                  onChange={(e) => {
                    updateSettings(prev => ({
                      ...prev,
                      cell_color: e.target.value
                    }))
                  }}
                />
              </div>

              <div className='button_area'>
                <input type='button' className="generate_button" value='Generate Board' onClick={generateBoard} />
                <input type='button' className='print_button' value='Print Board' onClick={() => window.print()} />
              </div>

            </div>
          </div>
        </div>


        <div className='display'>
          {(board?.length ?? 0) > 0 ?
            <div className='board'>
              <h1>{settings.heading}</h1>
              {board?.map((row: string[], row_index: number) => {
                return (
                  <div className='board_row' key={row_index}>
                    {row.map((word: string) => {
                      return (
                        <>
                          <Cell content={word} settings={settings} />
                        </>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            :
            <span>Click the generate button to preview :DD </span>
          }

        </div>

      </div>
    </>
  )

}

export default App
