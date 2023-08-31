/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';

type DatasetMapType = { label: string; data: number[]; backgroundColor: string }[];
type FetchedDataType = {
  dateLoaded: string;
  loginCount: {
    user: {
      id: string;
      name: string;
    };
    userLoginCount: number;
    userLastLoginDate: string | null;
  }[];
}[];

export const useMapChartDataUtils = () => {
  const mapDataForChart = (fetchedData: FetchedDataType, numberOfWeeks: number): DatasetMapType => {
    if(!fetchedData) return [];

    const usersPerWeekTotalCount: DatasetMapType = []; // array of objects of users and login data for all weeks
    const allUsers: string[] = []; // array of all users names

    //  Select only the desired number of weeks
    const currentPeriod = fetchedData.slice(0, numberOfWeeks).reverse();

    //  Create an array containing all user names
    currentPeriod.forEach(weekEntry => {
      weekEntry.loginCount.forEach(loginCountEntry => {
        if (!allUsers.includes(loginCountEntry.user.name)) {
          allUsers.push(loginCountEntry.user.name);
          usersPerWeekTotalCount.push({
            label: loginCountEntry.user.name,
            data: [],
            backgroundColor: `rgb(${faker.datatype.number({
              min: 0,
              max: 255
            })}, ${faker.datatype.number({ min: 0, max: 255 })}, ${faker.datatype.number({
              min: 0,
              max: 255
            })})`
          });
        }
      });
    });

    //  Update usersPerWeekTotalCount based on allUsers array
    currentPeriod.forEach(weekEntry => {
      const usersInCurrentWeek = weekEntry.loginCount.map(
        loginCountEntry => loginCountEntry.user.name
      );

      allUsers.forEach((user, userIndex) => {
        if (!usersInCurrentWeek.includes(user)) {
          const newData = [...usersPerWeekTotalCount[userIndex].data];
          if (newData.length > 0) {
            newData.unshift(usersPerWeekTotalCount[userIndex].data[0]);
          } else {
            newData.unshift(0);
          }
          usersPerWeekTotalCount[userIndex].data = newData;
          return;
        }
        weekEntry.loginCount.forEach(loginCountEntry => {
          if (user === loginCountEntry.user.name) {
            const newData = [...usersPerWeekTotalCount[userIndex].data];
            newData.unshift(loginCountEntry.userLoginCount);
            usersPerWeekTotalCount[userIndex].data = newData;
          }
        });
      });
    });

    const usersPerWeek: DatasetMapType = [];

    usersPerWeekTotalCount.forEach(user => {
      const differentiatedLogins: number[] = [];
      user.data.reverse().forEach((loginCountPerWeek, index, arr) => {
        if (index === 0) differentiatedLogins.push(loginCountPerWeek);
        else differentiatedLogins.push(loginCountPerWeek - arr[index - 1]);
      });
      usersPerWeek.push({ ...user, data: [...differentiatedLogins.reverse()] });
    });
    return usersPerWeek;
  };

  const getDatesForLoadedWeeks = (
    fetchedData: FetchedDataType,
    numberOfWeeks: number
  ): string[] => {
    if(!fetchedData) return [];

    return fetchedData.slice(0, numberOfWeeks).reduce<string[]>((labels, entry) => {
      labels.push(entry.dateLoaded);
      return labels;
    }, []);
  };

  return { getDatesForLoadedWeeks, mapDataForChart };
};
