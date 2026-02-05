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

const formatTextForCell = (text: string): string => {
  if (text === "FREE") return text;
  
  // Break long words (more than 10 characters) with hyphens at natural break points
  return text.split(/\s+/).map(word => {
    if (word.length > 10) {
      // Try to find natural break points, otherwise break at 6 chars
      const halfLength = Math.ceil(word.length / 2);
      return word.slice(0, halfLength) + '-' + word.slice(halfLength);
    }
    return word;
  }).join(' ');
}

interface CellProps {
  content: string;
  settings: Settings;
}

const Cell: React.FC<CellProps> = ({ content, settings }) => {

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const formattedContent = formatTextForCell(content);

  const styles = {
    fontSize: getFontSizeByCount(wordCount),
    borderWidth: `${settings.border_thickness}px`,
    borderColor: settings.border_color,
    borderStyle: 'solid',
    color: settings.text_color,
    backgroundColor: settings.cell_color,
    padding: '8px',
  }


  useEffect(() => {
    console.log(settings);
  }, [settings])

  return (
    <div style={styles} className="cell">
      {content === "FREE" ?
        <strong>{content}</strong>
        :
        <p>{formattedContent}</p>
      }
    </div>
  )
}

export default Cell; 
