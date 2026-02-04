import { useEffect } from "react";
import "./Cell.css";
import type { Settings } from "../../constants/types/settings";

const getFontSizeByCount = (wordCount: number): string => {
  if (wordCount === 1) return "1rem";
  if (wordCount === 2) return "0.95rem";
  if (wordCount === 3) return "0.85rem";
  if (wordCount === 4) return "0.75rem";
  if (wordCount >= 5) return "0.65rem";
  return "1rem";
}

interface CellProps {
  content: string;
  settings: Settings;
}

const Cell: React.FC<CellProps> = ({ content, settings }) => {

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  const styles = {
    borderWidth: `${settings.border_thickness}px`,
    borderColor: settings.border_color,
    borderStyle: 'solid',
    color: settings.text_color,
    backgroundColor: settings.cell_color,
    fontSize: getFontSizeByCount(wordCount),
  }


  useEffect(() => {
    console.log(settings);
  }, [settings])

  return (
    <div style={styles} className="cell">
      {content === "FREE" ?
        <strong style={{ fontSize: getFontSizeByCount(wordCount) }}>{content}</strong>
        :
        <p>{content}</p>
      }
    </div>
  )
}

export default Cell; 
