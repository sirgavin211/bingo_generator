import './App.css'
import { useState } from 'react';
import Cell from "./components/Cell/Cell.tsx";
import type { Settings } from './constants/types/settings.ts';






function App() {

  const [board, updateBoard] = useState<string[][]>();
  const [words, updateWords] = useState<string>("Bohemian Rhapsody, Imagine, Smells Like Teen Spirit, Billie Jean, Hey Jude, Like a Rolling Stone, I Will Always Love You, Respect, Good Vibrations, Johnny B. Goode, Hotel California, Purple Rain, Hallelujah, Uptown Funk, Wonderwall, Someone Like You, Dancing Queen, Sweet Child O' Mine, Lose Yourself, Yesterday, Blinding Lights, Rolling in the Deep, Heroes, Thriller, Stairway to Heaven, Space Oddity, Shape of You, Mr. Brightside, Dreams, Paint It Black");
  const [separator, updateSeparator] = useState<string>(",");
  const [settings, updateSettings] = useState<Settings>({
    border_thickness: 1,
    border_color: "#B1B1C7",
    text_color: "#3E4049",
    heading: "BINGO",
    background_color: "#C8C8DC",
    cell_color: "#E5E5F2",
  })

  const [board_amount, updateBoardAmount] = useState<number>(1);
  const [printing_board, startPrint] = useState<boolean>(false);
  const [boards, createBoards] = useState<string[][][]>();
  function generateBoard(): string[][] {
    if (!words) {
      alert("Put some words into the freaking text box!!! D:(");
      return [];
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

    return result;
  }

  function getRandomIndex(index: number): number {
    return Math.floor(Math.random() * index);
  }

  return (
    <>
      {!printing_board ? (
        <div className='app'>
          <div className='control_panel'>

            <h1>Control Panel</h1>

            <div className='input_panel'>

              <textarea
                placeholder="Put at least 25 words into the box, seperated by the character or string set to the right of me."
                onChange={(e) => {
                  updateWords(e.target.value);
                }}
                value={words}
              />

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

                <input
                  type="number"
                  placeholder="Print Amount"
                  onChange={(e) => {
                    updateBoardAmount(Number(e.target.value));
                  }}
                />



                <div className='button_area'>
                  <input type='button' className="generate_button" value='Generate Board' onClick={generateBoard} />
                  <input
                    type='button'
                    className='print_button'
                    value='Print Board'
                    onClick={() => {

                      startPrint(true);

                      const result = [];


                      let amountToPrint = board_amount;
                      if (amountToPrint <= 0) {
                        amountToPrint = 1;
                        updateBoardAmount(1);
                      }

                      for (let i = 0; i < amountToPrint; i++) {
                        result.push(generateBoard());
                      }

                      console.log(result);

                      createBoards(result);

                      setTimeout(() => {
                        window.print();
                      }, 100); // Small delay to allow UI to update

                      window.addEventListener('afterprint', () => {
                        startPrint(false);
                      });

                    }}
                  />
                </div>

              </div>
            </div>
          </div>


          <div className='display'>
            {(board?.length ?? 0) > 0 ?
              <div className='board' style={{
                backgroundColor: settings.background_color,
                border: `${settings.border_thickness}px solid ${settings.border_color}`,
              }}>
                <h1 style={{ color: settings.text_color }}>{settings.heading}</h1>
                <div className='grid_container'>
                  {board?.map((row: string[], row_index: number) => {
                    return (
                      <div className='board_row' key={row_index}>
                        {row.map((word: string, cell_index: number) => {
                          return (
                            <Cell key={`${row_index}-${cell_index}`} content={word} settings={settings} />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>

              :
              <span style={{ color: settings.text_color }}>Click the generate button to preview :DD </span>
            }

          </div>

        </div>
      ) : (
        <div id="print-area">
          {/* You can handle the print UI here */}
          {boards?.map((b, index) => (
            <div key={index} className='board-container'>
              <div className='board' style={{
                backgroundColor: settings.background_color,
                border: `${settings.border_thickness}px solid ${settings.border_color}`,
              }}>
                <h1 style={{ color: settings.text_color }}>{settings.heading}</h1>

                <div className='grid_container'>
                  {b?.map((row: string[], row_index: number) => {
                    return (
                      <div className='board_row' key={row_index}>
                        {row.map((word: string, cell_index: number) => {
                          return (
                            <Cell key={`${row_index}-${cell_index}`} content={word} settings={settings} />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </>
  )

}

export default App
