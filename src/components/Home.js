import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
    var date;
    const [startDate, setDate] = useState();
    const [dateAndDays, setDateAndDays] = useState(false);
    const [isItPalindrome, setIsItPalindrome] = useState(null);


    const check = (e) => {
        e.preventDefault();
        const d = new Date(startDate);
        const yr = JSON.stringify(d.getFullYear());
        const mth = d.getMonth() + 1;
        const dte = d.getDate();
        date = { day: dte, month: mth, year: yr };

        if (checkPalindromeForAllDateFormats(date)) {
            if (dateAndDays) {
                setDateAndDays(null);
            }
            setIsItPalindrome(true);
        } else {
            getNextPalindromeDate(date);
        }
    }

    const reverseStr = str => {
        var listOfChars = str.split('');
        var reverseListOfChars = listOfChars.reverse();
        var reversedStr = reverseListOfChars.join('');
        return reversedStr;
    }

    const isPalindrome = str => {
        var reverse = reverseStr(str);
        return str === reverse;
    }

    const convertDateToStr = date => {

        var dateStr = { day: '', month: '', year: '' };

        if (date.day < 10) {
            dateStr.day = '0' + date.day;
        }
        else {
            dateStr.day = date.day.toString();
        }

        if (date.month < 10) {
            dateStr.month = '0' + date.month;
        }
        else {
            dateStr.month = date.month.toString();
        }

        dateStr.year = date.year.toString();
        return dateStr;
    }

    const getAllDateFormats = date => {
        var dateStr = convertDateToStr(date);

        var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
        var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
        var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
        var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
        var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
        var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    }

    const checkPalindromeForAllDateFormats = date => {
        var listOfPalindromes = getAllDateFormats(date);

        var flag = false;

        for (var i = 0; i < listOfPalindromes.length; i++) {
            if (isPalindrome(listOfPalindromes[i])) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    // check for leap year
    const isLeapYear = year => {
        if (year % 400 === 0) {
            return true;
        }
        if (year % 100 === 0) {
            return false;
        }
        if (year % 4 === 0) {
            return true;
        }
        return false;
    }

    // gets next date
    const getNextDate = date => {
        var day = date.day + 1;
        var month = date.month;
        var year = date.year;

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

        // check for february
        if (month === 2) {
            // check for leap year
            if (isLeapYear(year)) {
                if (day > 29) {
                    day = 1;
                    month++;
                }
            }
            else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }

        else {

            if (day > daysInMonth[month - 1]) {
                day = 1;
                month++;
            }
        }

        if (month > 12) {
            month = 1;
            year++;
        }

        return {
            day: day,
            month: month,
            year: year
        };
    }

    // get next palindrome date
    const getNextPalindromeDate = date => {
        var ctr = 0;
        var nextDate = getNextDate(date);

        while (1) {
            ctr++;
            var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
            if (isPalindrome) {
                break;
            }
            nextDate = getNextDate(nextDate);
        }
        setDateAndDays([ctr, nextDate]); 
        if (isItPalindrome) {
            setIsItPalindrome(null);
        }
        return [ctr, nextDate];
    }

    return (
        <div className="home">
            <h1 className="instruction-header">Enter your Date of Birth <br/> and find out if your Birthday is a Palindrome</h1>
            <form onSubmit={(e) => check(e)} className="middle-container" id="form">
                <p className="instruction">This App Checks your Date of Birth in 4 formats <br/><span style={{ fontWeight:"bold"}}> YYYY-MM-DD, DD-MM-YYYY, MM-DD-YY, M-DD-YYYY</span></p>
                <p className="instruction">If your Date of Birth is 01-Aug-1995<br/> then the app will check for 19950801, 01081995, 080195, 1081995</p>
                <DatePicker
                    selected={startDate}
                    className="date"
                    onChange={(date) => { setDate(date) }}
                    placeholderText="DD/MM/YYYY"
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    required />

                <button type="submit" className="btn-2 btn">Check</button>
            </form>

            {isItPalindrome && <p className="results">Awesome! Your birday is a palidrome day.🥳</p>}
            {dateAndDays && <p className="results">Your Date of Birth is not a Palindrome.<br/> You missed it by {dateAndDays[0]} days. The Nearest palindrome date is {dateAndDays[1].day + "/" + dateAndDays[1].month + "/" + dateAndDays[1].year}. But not to worry you are still born special 🥳.</p>}
            <footer>
                <p>Dhruva | 2021 September 2021</p>
            </footer>
        </div>
    );
}

export default Home;
