/**
 * Copyright (c) 2021 @Azrun
 * SPDX-License-Identifier: MIT
 */

import { Button, LabeledList, Section } from 'tgui-core/components';

import { useBackend } from '../backend';
import { Window } from '../layouts';

interface LongRangeTeleporterData {
  destinations;
  receive_allowed;
  send_allowed;
  syndicate;
}

export const LongRangeTeleporter = () => {
  const { act, data } = useBackend<LongRangeTeleporterData>();

  const { destinations, receive_allowed, send_allowed, syndicate } = data;

  return (
    <Window theme={syndicate ? 'syndicate' : 'ntos'} width={390} height={380}>
      <Window.Content>
        <Section title="Destinations">
          <LabeledList>
            {destinations.length ? (
              destinations.map((d) => (
                <LabeledList.Item
                  label={d['destination']}
                  key={d['destination']}
                >
                  {!!send_allowed && (
                    <Button
                      icon="sign-out-alt"
                      onClick={() =>
                        act('send', {
                          target: d['ref'],
                          name: d['destination'],
                        })
                      }
                    >
                      Send
                    </Button>
                  )}
                  {!!receive_allowed && (
                    <Button
                      icon="sign-in-alt"
                      onClick={() =>
                        act('receive', {
                          target: d['ref'],
                          name: d['destination'],
                        })
                      }
                    >
                      Receive
                    </Button>
                  )}
                </LabeledList.Item>
              ))
            ) : (
              <LabeledList.Item>
                No destinations are currently available.
              </LabeledList.Item>
            )}
          </LabeledList>
        </Section>
      </Window.Content>
    </Window>
  );
};
