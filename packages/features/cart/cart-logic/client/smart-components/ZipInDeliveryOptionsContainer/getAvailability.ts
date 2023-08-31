/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-param-reassign */

export const getAvailability = (av?: Availability[]) => {
  const mergeAvailability = (src: RawAvailabilityEntry, dest: AvailabilityEntry) => {
    dest.id = src.shipNode?.id ?? src.distributionGroup?.id!;
    dest.name = src.shipNode?.name ?? src.distributionGroup?.name!;
    dest.type = src.shipNode ? 'clickCollect' : 'homeDelivery';

    dest.status = dest.status && dest.status !== src.status ? 'Partial' : src.status;

    if (src.availableDate) {
      dest.availableDate =
        src.availableDate > (dest.availableDate ?? '') ? src.availableDate : dest.availableDate;
    }
    dest.availableQuantity = Math.min(dest.availableQuantity ?? -1, src.availableQuantity ?? -1);
    if (dest.availableQuantity === -1) dest.availableQuantity = undefined;

    return dest;
  };

  const sa: Record<string, AvailabilityEntry> = {};
  av?.forEach(ia => {
    ia.availability.forEach(a => {
      const id = a.shipNode?.id ?? a.distributionGroup?.id!;
      sa[id] = mergeAvailability(a, sa[id] ?? {});
    });
  });

  return Object.values(sa);
};

export type Availability = {
  partnumber: string;
  availability: RawAvailabilityEntry[];
};

type RawAvailabilityEntry = {
  status: string;
  availableDate?: string;
  availableQuantity?: number;
  shipNode?: {
    id: string;
    name: string;
    distance: string;
  };
  distributionGroup?: {
    id: string;
    name: string;
  };
};

export type AvailabilityEntry = RawAvailabilityEntry & { id: string; name: string; type: string };
