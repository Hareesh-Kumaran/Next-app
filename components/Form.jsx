import Link from "next/link";
import '@/styles/Form.scss';
export default function Form({type,promptObj,setPromptObj,handleSubmit})
{
    return (
      <>
        <form>
          <div className="field-wrapper">
            <label>Your Prompt</label>
            <textarea
              cols="30"
              rows="15"
              value={promptObj.prompt}
              placeholder="write your prompt"
              onChange={(e)=>setPromptObj({...promptObj,prompt:e.target.value})}
            />
          </div>

          <div className="field-wrapper">
            <label>
              Tag<span>(#coding,#fitness)</span>
            </label>
            <input
              placeholder="#tag"
              value={promptObj.tag}
              onChange={(e) => setPromptObj({ ...promptObj, tag: e.target.value })}
            />
          </div>

          <div className="button-wrapper">
            <Link href="/" className="link">
              Back
            </Link>
            <button onClick={handleSubmit}>{type}</button>
          </div>
        </form>
      </>
    );
    
}

