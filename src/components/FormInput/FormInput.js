/* eslint-disable react/prop-types */
import './FormInput.scss';

export default function FormInput({ label, type, name, placeholder, value, handleChange }) {
    function translit(word) {
        let answer = '';
        const converter = {
            а: 'a',
            б: 'b',
            в: 'v',
            г: 'g',
            д: 'd',
            е: 'e',
            ё: 'e',
            ж: 'zh',
            з: 'z',
            и: 'i',
            й: 'y',
            к: 'k',
            л: 'l',
            м: 'm',
            н: 'n',
            о: 'o',
            п: 'p',
            р: 'r',
            с: 's',
            т: 't',
            у: 'u',
            ф: 'f',
            х: 'h',
            ц: 'c',
            ч: 'ch',
            ш: 'sh',
            щ: 'sch',
            ь: '',
            ы: 'y',
            ъ: '',
            э: 'e',
            ю: 'yu',
            я: 'ya',

            А: 'A',
            Б: 'B',
            В: 'V',
            Г: 'G',
            Д: 'D',
            Е: 'E',
            Ё: 'E',
            Ж: 'Zh',
            З: 'Z',
            И: 'I',
            Й: 'Y',
            К: 'K',
            Л: 'L',
            М: 'M',
            Н: 'N',
            О: 'O',
            П: 'P',
            Р: 'R',
            С: 'S',
            Т: 'T',
            У: 'U',
            Ф: 'F',
            Х: 'H',
            Ц: 'C',
            Ч: 'Ch',
            Ш: 'Sh',
            Щ: 'Sch',
            Ь: '',
            Ы: 'Y',
            Ъ: '',
            Э: 'E',
            Ю: 'Yu',
            Я: 'Ya',
        };

        for (let i = 0; i < word.length; ++i) {
            if (converter[word[i]] === undefined) {
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }

        return answer;
    }

    const thereIsALabel = label ? 'input_with_label' : 'input_with_out_label';
    const ifTypeRadio = type === 'radio' ? 'label_with_radio' : 'label_with_out_radio';
    const radioID = type === 'radio' ? `${name}_${translit(value)}` : name;

    return (
        <div className="block_input">
            {label ? (
                <label htmlFor={radioID} className={ifTypeRadio}>
                    {label}
                </label>
            ) : null}
            <input
                className={thereIsALabel}
                type={type}
                name={name}
                placeholder={placeholder}
                id={radioID}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
